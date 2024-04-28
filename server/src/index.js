import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import {initializeDataBaseWithRetry} from "./initializeDataBase.js";

// Express config
const app = express();
app.use(cors()); //Work with any origin for now
app.use(express.json());

// Initialize authentication
const { AuthProvider } = require("@propelauth/node");
const authProvider = new AuthProvider({
    apiKey: process.env.PROPEL_AUTH_API,
    authDomain: process.env.PROPEL_URL
});

// Initialize database, exit if failed
let dbConnector;
initializeDataBaseWithRetry(5).then(conn => {
    dbConnector = conn;
});




// Post Requests
// app.post("/create-task", async (req, res) => createTask(req, res, dbConnector));

// Is authentication valid?
// app.get("/auth", async(req,res)=> authenticateRequest(req,res,authProvider));


// Get Requests


// Listen for requests
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});