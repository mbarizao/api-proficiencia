import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import https from 'https';
import fs from 'fs';

// Routes

import { getAnalytics } from "./src/routes/rxAnalytics.js";

// Import .env files
dotenv.config();

const app = express();

// Cors configure
app.use((req, res, next) => {
    //Permission of access API, change * to domain name
    res.header("Access-Control-Allow-Origin", "*");
  
    //Methods that the domain can use
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    app.use(cors());

    next();
});

// Use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Run api server
const server = app.listen(process.env.SERVER_PORT, () => {
    console.clear();
    console.log("[CONSOLE] Server running in PORT", server.address().port);
});

// Call routes
app.use('/solarAnalytics', getAnalytics);


export default app;