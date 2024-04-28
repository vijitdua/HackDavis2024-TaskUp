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

        if (username === givenFriendUsername) {
            throw new Error("adding yourself");
        }

        const [rows] = await dbConnector.query(`SELECT friends FROM ${process.env.MYSQL_USER_TABLE} WHERE username = ?`, [username]);

        // Check for duplicate friend
        let currentFriends = rows[0].friends ? rows[0].friends.split(',') : [];
        if (currentFriends.includes(givenFriendUsername)) {
            throw new Error("already added");
        }

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

// Req should have .token .username (username to remove)
export async function removeFriend(req, res, dbConnector){
    try {
        const token = req.body.token;
        const givenFriendUsername = req.body.username;

        if (!token) {
            throw new Error("token not received");
        }

        if (!givenFriendUsername) {
            throw new Error("data incomplete");
        }

        let [users] = await dbConnector.execute(`SELECT username FROM ${process.env.MYSQL_USER_TABLE} WHERE token = ?;`, [token]);
        if (users.length === 0) {
            throw new Error("invalid token");
        }
        let username = users[0].username;

        let [rows] = await dbConnector.query(`SELECT friends FROM ${process.env.MYSQL_USER_TABLE} WHERE username = ?`, [username]);
        let currentFriends = rows[0].friends ? rows[0].friends.split(',') : [];

        if (!currentFriends.includes(givenFriendUsername)) {
            throw new Error("invalid username"); // Using this to indicate the friend is not in the list
        }

        // Remove the friend and update the list
        currentFriends = currentFriends.filter(friend => friend !== givenFriendUsername);
        let newFriendsList = currentFriends.join(',');

        await dbConnector.query(`UPDATE ${process.env.MYSQL_USER_TABLE} SET friends = ? WHERE username = ?`, [newFriendsList, username]);
        res.json({ res: "success" });
    } catch(e) {
        console.error(`Error removing a friend: ${e}`);
        res.json({ res: `${e}` });
    }
}

// Needs only .token
export async function fetchFriends(req,res,dbConnector){
    try {
        const token = req.params.token;

        if (!token) {
            throw new Error("token not received");
        }

        // Retrieve the username associated with the token
        let [users] = await dbConnector.execute(`SELECT username, friends FROM ${process.env.MYSQL_USER_TABLE} WHERE token = ?;`, [token]);
        if (users.length === 0) {
            throw new Error("invalid token");
        }

        // Return the friends list or an empty string if no friends
        const friendsList = users[0].friends || '';

        res.json({ res: "success", friendsList: friendsList});
    }catch(e){
        console.error(`Error fetching friend list: ${e}`);
        res.json({ res: `${e}` });
    }
}