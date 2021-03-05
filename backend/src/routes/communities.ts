import { Request, Response } from 'express';
import {getRepository} from "typeorm";
import Community from '../entity/Community';

const router = require('express').Router();

router.route('/').post(async (req : Request, res : Response) => {
    const communityRepository = getRepository(Community);

    const {name = "", description, communityType, isAdult} = req.body;

    if (name.length < 3 || name.length > 21) {
        res.status(400).json({'Error' : 'Name is not appropriate length'});
        return;
    }

    const community = communityRepository.create(req.body);

    try {
        await communityRepository.save(community);
        // Successfully created in DB
        res.json({
            name,
            description,
            communityType,
            isAdult
        }); 
    }
    catch (err) {
        console.log(err);
        if (err.message.includes("unique")) {
            res.status(400).json({'Error' : 'Username and/or email are taken'});
        }
        else if (err.message.includes("violates not-null")) {
            res.status(400).json({'Error' : 'Please provide all the required fields'});
        }
        else if (err.message.includes("invalid input")) {
            res.status(400).json({'Error' : 'Please provide an appropriate community type'});
        }
        else { // Generic error
            res.status(400).json({'Error' : 'Community could not be created at this time'});
        }
    }
});

module.exports = router;