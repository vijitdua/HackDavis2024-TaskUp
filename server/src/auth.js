import dotenv from "dotenv";
import propel from "@propelauth/node";
dotenv.config();

async function authenticateRequest(req, res, next, authProvider) {
    try {
        const user = await authProvider.authenticateRequest(req);
        req.user = user;
        next(); // proceed to the next middleware or request handler
    } catch (error) {
        res.status(401).send("Unauthorized");
    }
}
