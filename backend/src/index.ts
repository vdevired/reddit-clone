import "reflect-metadata";
import {createConnection} from "typeorm";

createConnection().then(async connection => {

    // Here you can setup and run express/koa/any other framework
    const express = require('express');
    const cors = require('cors');

    require('dotenv').config();

    const app = express();
    const port = process.env.PORT || 5000;

    app.use(cors());
    app.use(express.json());

    const rpcRouter = require('./routes/rpc');
    const usersRouter = require('./routes/users');
    const communitiesRouter = require('./routes/communities');


    app.use('/rpc', rpcRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/communities', communitiesRouter);

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });

}).catch(error => console.log(error));
