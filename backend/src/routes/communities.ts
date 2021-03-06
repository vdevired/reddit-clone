import { Request, Response } from 'express';
import {getRepository, getConnection} from "typeorm";
import Community from '../entity/Community';
import { TopicToCommunity } from '../entity/Topic';
import {authenticateToken} from "../middleware";

const router = require('express').Router();

router.use(authenticateToken);

router.route('/').post(async (req : Request, res : Response) => {
    const communityRepository = getRepository(Community);

    const {name = "", description, communityType, isAdult, topics = []} = req.body;

    if (name.length < 3 || name.length > 21) {
        res.status(400).json({'Error' : 'Name is not appropriate length'});
        return;
    }

    const community = communityRepository.create(req.body as Community);
    community.owner = req.user;
    
    try {
        await getConnection().transaction(async transactionalEntityManager => {
            await transactionalEntityManager.save(community);
            console.log(community);

            // Topics
            const topicToCommunityRepository = getRepository(TopicToCommunity);
            const topicToCommunities = [];
            let i = 0;
            topics.slice(0, 26).forEach(topicId => { // Max of 1+25 topics
                const topicToCommunity = topicToCommunityRepository.create({
                    topicId,
                    communityId : community.id,
                    primary : i++ === 0
                });
                topicToCommunities.push(topicToCommunity);
            });
            await transactionalEntityManager.save(topicToCommunities);
        });
        
        // Successfully created in DB
        res.json(community); 
    }
    catch (err) {
        console.log(err);
        if (err.message.includes("unique")) {
            res.status(400).json({'Error' : 'Name is taken'});
        }
        else if (err.message.includes("violates not-null")) {
            res.status(400).json({'Error' : 'Please provide all the required fields'});
        }
        else if (err.message.includes("invalid input")) {
            res.status(400).json({'Error' : 'Please provide an appropriate types'});
        }
        else { // Generic error
            res.status(400).json({'Error' : 'Community could not be created at this time'});
        }
    }
});

module.exports = router;