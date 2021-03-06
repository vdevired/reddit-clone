import User from "./entity/User";
import { getRepository } from "typeorm";
const jwt = require('jsonwebtoken');


export function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <Token>, we want token so index 1
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
        if (err) return res.sendStatus(401);
        const {userId} = payload;

        const userRepository = getRepository(User);
        const user = await userRepository.findOne({id : userId});
        req.user = user;
        next();
    });
}
