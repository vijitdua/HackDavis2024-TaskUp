import {getTask} from "../api/readingDB";

const taskID = 'OQFVhGVZPV42hDtO3OTY'; // Replace with the actual ID you want to fetch

getTask(taskID)
    .then(taskData => {
        console.log(taskData); // Do something with the task data
    })
    .catch(error => {
        console.error("There was an error fetching the task: ", error);
    });

