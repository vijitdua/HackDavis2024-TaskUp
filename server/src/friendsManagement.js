import dotenv from "dotenv";
import mysql from "mysql2/promise";
import {authenticateToken} from "./auth.js";
dotenv.config();

// Req should have .token .username (username to add)
export async function addFriend(req, res, dbConnector){
    try{
        const token = req.body.token;
        const givenFriendUsername = req.body.username;
        if (!token) {
            throw new Error("token not received");
        }

        if (!givenFriendUsername) {
            throw new Error("data incomplete");
        }

        // Check if host token is correct and get host username
        let username = await dbConnector.execute(`SELECT username FROM ${process.env.MYSQL_USER_TABLE} WHERE token = ?;`, [token]);
        if (!(username[0].length > 0)) {
            throw new Error("invalid token"); // User tried to sign in with invalid / fake token.
        }
        username = username[0][0].username;

        let friendUsername = await dbConnector.execute(`SELECT username FROM ${process.env.MYSQL_USER_TABLE} WHERE username = ?;`, [givenFriendUsername]);
        if (!(friendUsername[0].length > 0)) {
            throw new Error("invalid username"); // User tried to sign in with invalid / fake token.
        }
        friendUsername = friendUsername[0][0].username;

        const [rows] = await dbConnector.query(`SELECT friends FROM ${process.env.MYSQL_USER_TABLE} WHERE username = ?`, [username]);

        let newFriendsList;
        if (rows[0].friends) {
            // Append the new friend to the existing list
            newFriendsList = rows[0].friends + ',' + friendUsername;
        } else {
            // Start a new list with the given friend username
            newFriendsList = friendUsername;
        }

        // Update the friends column with the new list
        await dbConnector.query(`UPDATE ${process.env.MYSQL_USER_TABLE} SET friends = ? WHERE username = ?`, [newFriendsList, username]);
        res.json({res: `success`});
    }catch(e){
        console.error(`Error adding a friend: ${e}`);
        res.json({ res: `${e}`});
    }
}