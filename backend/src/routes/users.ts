import { Request, Response } from 'express';
import {getRepository} from "typeorm";
import User from '../entity/User';
import {validateEmail} from "../utils";
const bcrypt = require('bcrypt');

const router = require('express').Router();

router.route('/').post(async (req : Request, res : Response) => {
    const userRepository = getRepository(User);

    // Giving default values to fields that need to be manually checked, simplifying below code
    const {email = "", username = "", password = ""} = req.body;

    if (username.length < 3 || username.length > 20) {
        res.status(400).json({'Error' : 'Username is not appropriate length'});
        return;
    }

    if (password.length < 6 || username.length > 20) {
        res.status(400).json({'Error' : 'Password is not appropriate length'});
        return;
    }

    const isEmailValid = validateEmail(email);
    if (email.length !== 0 && !isEmailValid) {
        res.status(400).json({'Error' : 'Email is not valid'});
        return;
    }

    // Everything is valid but username and/or email may not be unique
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({
        ...req.body, 
        username : username.toLowerCase(), // Usernames should be case insensitive unique
        password : hashedPassword
    });

    try {
        await userRepository.save(user);
        // Successfully created in DB
        res.json(user); // Don't want to send password in response lol
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