import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import {initializeDataBaseWithRetry} from "./initializeDatabase.js";
import {authenticateToken, login, signUp} from "./auth.js";
import {createTask, deleteTask, fetchTasks, setTaskCompletion} from "./taskManagement.js";
import {fetchUserStat} from "./userStats.js";
import {addFriend, fetchFriends, removeFriend} from "./friendsManagement.js";

// Express config
const app = express();
app.use(cors()); //Work with any origin for now
app.use(express.json());

// Initialize database, exit if failed
let dbConnector;
initializeDataBaseWithRetry(5).then(conn => {
    dbConnector = conn;
});




// Post Requests
// app.post("/create-task", async (req, res) => createTask(req, res, dbConnector));
app.post("/signup", async (req, res) => signUp(req, res, dbConnector));
app.post("/login", async (req, res) => login(req, res, dbConnector));
app.post("/authenticate", async (req, res) => authenticateToken(req, res, dbConnector));
app.post("/create-task", async(req, res) => createTask(req, res, dbConnector));
app.post("/delete-task", async(req,res)=> deleteTask(req,res,dbConnector)); //TODO
app.post("/change-task-completion", async(req,res)=> setTaskCompletion(req,res,dbConnector)); //TODO
app.post("/add-friend", async(req, res) => addFriend(req,res,dbConnector));
app.post("/remove-friend", async(req, res) => removeFriend(req,res,dbConnector));



// Get Requests
app.get("/my-tasks/:token", async(req,res)=> fetchTasks(req,res,dbConnector));
app.get("/user-stats/:username", async(req,res)=> fetchUserStat(req,res,dbConnector));
app.get("/fetch-friends/:token", async(req,res)=> fetchFriends(req,res,dbConnector));


// Listen for requests
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});