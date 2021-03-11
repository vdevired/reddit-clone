import { Request, Response } from 'express';
import {getRepository, getConnection} from "typeorm";
import User from '../entity/User';
import RefreshToken from '../entity/RefreshToken';
import {authenticateToken} from "../middleware";
import {sendEmail} from "../utils";
import {frontendUrl} from "../constants";
import {v4 as uuidv4} from "uuid";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncRedis = require("async-redis");

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
        return res.status(400).json({'Error' : 'Provide refresh token'});
    }

    const {refreshToken} = req.body;
    const refreshTokenDb = await refreshTokenRepository.findOne({token : refreshToken});

    const errorMessage = "Please log back in";
    if (refreshTokenDb === undefined) return res.status(401).json({'Error' : errorMessage});

    // Token should mostly be valid as it was in DB, but just to be safe
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) return res.status(401).json({'Error' : errorMessage});
        const {userId} = payload;
        
        const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    
        res.json({ accessToken: accessToken });
    });
    
});

router.route('/forgotUsername').post(async (req : Request, res : Response) => {
    const userRepository = getRepository(User);

    if (!('email' in req.body)) {
        return res.status(400).json({'Error' : 'Provide email address'});
    }

    const {email} = req.body;
    const user = await userRepository.findOne({email});

    // Same status regardless of whether user exists or not for security reasons
    // we don't want to just reveal to anyone whether a user exists with that email or not
    res.status(204).send(); 

    if (user !== undefined) { // User exists
        // Send email with username
        sendEmail(email, "Reddit, here's your username", `Your username is ${user.username}`);
    }
})

const redis_port = process.env.REDIS_PORT || 6379;
const redis_client = asyncRedis.createClient(redis_port);

router.route('/forgotPassword').post(async (req : Request, res : Response) => {
    const userRepository = getRepository(User);

    if (!('username' in req.body) || !('email' in req.body)) {
        return res.status(400).json({'Error' : 'Provide username and email address'});
    }

    const {username, email} = req.body;
    const user = await userRepository.findOne({username, email});

    res.status(204).send();

    if (user !== undefined) {
        const token = uuidv4();
        redis_client.setex(token, 60*60*24, username); // Valid for 24 hours
        sendEmail(
            email, 
            "Reddit, here is your password reset link", 
            `Your password reset link is ${frontendUrl}/resetPassword/${token}/ It is valid for 24 hours`
        );
    }
})

router.route('/validateResetPasswordToken').get(async (req : Request, res : Response) => {
    if (!('token' in req.query) ) {
        return res.status(400).json({'Error' : 'Provide token'});
    }

    const {token} = req.query;

    try {
        const username = await redis_client.get(token);
        if (!username) {
            return res.status(400).json({'Error' : 'Bad token'});
        }

        return res.status(204).send();
    }
    catch(err) { // Redis down
        return res.status(400).json({'Error' : 'Try again later'});
    }
})

router.route('/resetPassword').post(async (req : Request, res : Response) => {
    const userRepository = getRepository(User);

    if (!('token' in req.body) || !('password' in req.body)) {
        return res.status(400).json({'Error' : 'Provide token and password'});
    }

    const {token, password} = req.body;

    if (password.length < 6) {
        return res.status(400).json({'Error' : 'Password is not appropriate length'});
    }

    try {
        const username = await redis_client.get(token);
        if (!username) {
            return res.status(400).json({'Error' : 'Bad token'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({password : hashedPassword})
            .where("username = :username", { username })
            .execute();

        redis_client.del(token);
        return res.status(204).send();
    }
    catch(err) { // Redis down
        return res.status(400).json({'Error' : 'Try again later'});
    }
})

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

router.route('/me').get((req : Request, res : Response) => {
    const {user} = req;
    res.json(user);
})

module.exports = router;