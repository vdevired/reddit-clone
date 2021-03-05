import { Request, Response } from 'express';
import {getRepository, getConnection} from "typeorm";
import User from '../entity/User';
import RefreshToken from '../entity/RefreshToken';
import {authenticateToken} from "../middleware";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

router.route('/isEmailUnique').get(async (req : Request, res : Response) => {
    const userRepository = getRepository(User);

    if (!('email' in req.query)) {
        return res.status(400).json({'Error' : 'Provide email address'});
    }
    
    const {email} = req.query;
    const user = await userRepository.findOne({email});

    res.json({
        unique : user === undefined 
    })
});

router.route('/isUsernameUnique').get(async (req : Request, res : Response) => {
    const userRepository = getRepository(User);

    if (!('username' in req.query)) {
        return res.status(400).json({'Error' : 'Provide username'});
    }
    
    const {username} = req.query;
    const user = await userRepository.findOne({username});

    res.json({
        unique : user === undefined 
    })
});

router.route('/login').post(async (req : Request, res : Response) => {
    const userRepository = getRepository(User);

    if (!('username' in req.body) || !('password' in req.body)) {
        return res.status(400).json({'Error' : 'Provide both username and password'});
    }

    const {username, password} = req.body;
    const user = await userRepository.findOne({username});

    const errorMessage = "Incorrect username or password";
    
    if (user === undefined) {
        return res.status(401).json({'Error' : errorMessage});
    }

    // User was found
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (passwordCorrect) {
        const accessToken = jwt.sign({userId : user.id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({userId : user.id}, process.env.REFRESH_TOKEN_SECRET);
        res.json({accessToken, refreshToken});

        const refreshTokenRepository = getRepository(RefreshToken);
        const refreshTokenDb = refreshTokenRepository.create({token : refreshToken});
        refreshTokenDb.owner = user;

        try {
            await refreshTokenRepository.save(refreshTokenDb);
        }
        catch (err) { // Unique constraint failed on ownerId, so logging in when you're already logged in
            // No need to do anything
        }
    }
    else {
        res.status(401).json({'Error' : errorMessage});
    }
});

router.route('/refreshToken').post(async (req : Request, res : Response) => {
    const refreshTokenRepository = getRepository(RefreshToken);

    if (!('refreshToken' in req.body)) {
        res.status(400).json({'Error' : 'Provide refresh token'});
        return;
    }

    const {refreshToken} = req.body;
    const refreshTokenDb = await refreshTokenRepository.findOne({token : refreshToken});

    const errorMessage = "Please log back in";
    if (refreshTokenDb === undefined) return res.status(401).json({'Error' : errorMessage});

    // Token should mostly be valid as it was in DB, but just to be safe
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, {userId}) => {
        if (err) return res.status(401).json({'Error' : errorMessage});
        const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    
        res.json({ accessToken: accessToken });
    });
    
});

router.use(authenticateToken);

router.route('/logout').post(async (req : Request, res : Response) => {
    // When logout button is clicked on frontend, we already remove tokens from localStorage
    // Now we remove refreshToken from DB
    const {user} = req;

    await getConnection()
        .createQueryBuilder()
        .delete()
        .from(RefreshToken)
        .where("ownerId = :id", { id: user.id })
        .execute();

    res.status(204).send();
});

module.exports = router;