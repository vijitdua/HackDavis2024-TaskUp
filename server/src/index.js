import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Imports dotenv

// Express config
const app = express();
app.use(cors()); //Work with any origin for now
app.use(express.json());

// Setup FireBase
const admin = require('firebase-admin');

const serviceAccount = require('/path/to/service-account-file.json'); //TOOD: Fix

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `${process.env.DATABASE_URL}`
});

const db = admin.firestore();


// Post Requests


// Get Requests


// Listen for requests
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});