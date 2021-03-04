import { Request, Response } from 'express';
import {getRepository} from "typeorm";
import User from '../entity/User';

const router = require('express').Router();

router.route('/isEmailUnique').get(async (req : Request, res : Response) => {
    const userRepository = getRepository(User);

    if (!('email' in req.query)) {
        res.status(400).json({'Error' : 'Provide email address'});
        return;
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
        res.status(400).json({'Error' : 'Provide username'});
        return;
    }
    
    const {username} = req.query;
    const user = await userRepository.findOne({username});

    res.json({
        unique : user === undefined 
    })
});

module.exports = router;