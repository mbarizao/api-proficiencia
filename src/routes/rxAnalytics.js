import app from "express"
import dotenv from "dotenv";

import databaseConnection from "../database/index.js";
import apiReturns from "../utils/apiReturns.js";
import moment from "moment/moment.js";

dotenv.config();

const getAnalytics = app.Router();

const getData = async () => {
    const queryStringDefault = `SELECT estado, count(estado) as qtd FROM irenadb.solarenergy GROUP BY estado`;

    return new Promise((resolve, reject) => {
        databaseConnection.query(queryStringDefault, async (err, rows) => {
            if (err) {
                return reject(err);
            }

            return resolve(rows);
        });
    }).then((data) => {
        return apiReturns.success(data);
    }).catch((err) => {
        return apiReturns.error(err);
    });
}

// Get branches route
getAnalytics.get('/', async (req, res) => {
    console.log(`Request - [${moment().format('DD/MM/yyyy - HH:mm')}]`);
    const data = await getData();
    res.send(data);
});

export { getAnalytics };