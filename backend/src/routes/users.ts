import { Request, Response } from 'express';
import {getRepository} from "typeorm";
import User from '../entity/User';
import {validateEmail} from "../utils";

const router = require('express').Router();

router.route('/').post(async (req : Request, res : Response) => {
    const userRepository = getRepository(User);

    if (!('username' in req.body) || !('password' in req.body)) {
        res.status(400).json({'Error' : 'Please provide all required fields'});
        return;
    }

    const {email, username, password} = req.body;

    if (username.length < 3 || username.length > 20) {
        res.status(400).json({'Error' : 'Username is not appropriate length'});
        return;
    }

    if (password.length < 6 || username.length > 20) {
        res.status(400).json({'Error' : 'Password is not appropriate length'});
        return;
    }

    const isEmailValid = validateEmail(email || "");
    if (email && email.length !== 0 && !isEmailValid) {
        res.status(400).json({'Error' : 'Email is not valid'});
        return;
    }

    // Everything is valid but username and/or email may not be unique
    const user = userRepository.create(req.body);

    try {
        await userRepository.save(user);
        // Successfully created in DB
        res.json({
            username,
            email
        }); // Don't want to send password in response lol
    }
    catch (err) {
        if (err.message.includes("unique")) {
            res.status(400).json({'Error' : 'Username and/or email are taken'});
        }
        else { // Generic error
            res.status(400).json({'Error' : 'User could not be created at this time'});
        }
    }
});

module.exports = router;