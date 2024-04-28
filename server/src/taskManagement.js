// req contains .token .name (task name), .priority (3,2,1 but as string), .description, .deadline (Format unsure, check)
import {createTaskDataBaseForUser} from "./initializeDatabase.js";

export async function createTask(req, res, dbConnector) {
    try {
        const token = req.body.token;
        const name = req.body.name;
        const priority = req.body.priority;
        const description = req.body.description;
        const deadline = req.body.deadline;

        if (!token) {
            throw new Error("token not received");
        }

        if (!name || !priority || !description || !deadline) {
            throw new Error("data incomplete");
        }

        // Check if host token is correct and get host username
        let username = await dbConnector.execute(`SELECT username FROM ${process.env.MYSQL_USER_TABLE} WHERE token = ?;`, [token]);
        if (!(username[0].length > 0)) {
            throw new Error("invalid token"); // User tried to sign in with invalid / fake token.
        }
        username = username[0][0].username;

        // On the offchance database didn't get created when user signed up, create it now.
        await createTaskDataBaseForUser(dbConnector, token);

        await dbConnector.query(`INSERT INTO ${process.env.MYSQL_TASK_TABLE}${username} (
                        taskName, 
                        priority, 
                        description, 
                        deadline, 
                        completedDate,
                        taskFinished
                    ) VALUES (?, ?, ?, ?, ?, ?);`,
            [name, priority, description, deadline, null, false]
        );
        res.json({res: "success"});


    }catch(e){
        console.error(`A user tried to create a new task and caused an error: ${e}`);
        res.json({...req.body, res: `${e}`});
    }
}

export async function fetchTasks(req, res, dbConnector) {
    try {
        const token = req.params.token;  // Assuming token is passed as URL parameter

        if (!token) {
            throw new Error("token not received");
        }

        // Retrieve the username associated with the token
        // Check if host token is correct and get host username
        let username = await dbConnector.execute(`SELECT username FROM ${process.env.MYSQL_USER_TABLE} WHERE token = ?;`, [token]);
        if (!(username[0].length > 0)) {
            throw new Error("invalid token"); // User tried to sign in with invalid / fake token.
        }
        username = username[0][0].username;

        // Query to fetch all tasks for the user
        const [tasks] = await dbConnector.query(`SELECT * FROM ${process.env.MYSQL_TASK_TABLE}${username};`);

        // Construct the response
        const response = {
            res: `success`,
            totalTasks: tasks.length,
            tasks: tasks
        };

        res.json(response);
    } catch (e) {
        console.error(`Error fetching tasks: ${e}`);
        res.json({ res: `${e}`});
    }
}