import dotenv from "dotenv";
import mysql from "mysql2/promise";
import {authenticateToken} from "./auth.js";

dotenv.config();


//
export async function fetchUserStat(req, res, dbConnector) {
    try {
        const givenUsername = req.params.username;
        if (!givenUsername) {
            throw new Error("username not received");
        }

        // Retrieve the username associated with the token
        // Check if host token is correct and get host username
        let username = await dbConnector.execute(`SELECT username FROM ${process.env.MYSQL_USER_TABLE} WHERE username = ?;`, [givenUsername]);
        if (!(username[0].length > 0)) {
            throw new Error("invalid username"); // User tried to sign in with invalid / fake token.
        }
        username = username[0][0].username;

        // DataSets
        let numTasksDoneToday = await dbConnector.execute(`SELECT COUNT(*) AS count FROM ${process.env.MYSQL_TASK_TABLE}${username}
                                                            WHERE completedDate > Now() - INTERVAL 24 HOUR AND taskFinished = 1;
                                                            `);
        console.log(numTasksDoneToday);
        numTasksDoneToday = numTasksDoneToday[0][0].count;
        console.log(numTasksDoneToday);

        let firstName = await dbConnector.execute(`SELECT firstName FROM ${process.env.MYSQL_USER_TABLE} WHERE username = ?;`, [username]);
        firstName = firstName[0][0].firstName;
        let lastName = await dbConnector.execute(`SELECT lastName FROM ${process.env.MYSQL_USER_TABLE} WHERE username = ?;`, [username]);
        lastName = lastName[0][0].lastName;

        res.json({res: `success`, firstName: firstName, lastName: lastName, numTasksDoneToday: numTasksDoneToday});
    }catch(e){
        console.error(`Error fetching tasks: ${e}`);
        res.json({ res: `${e}`});
    }


}