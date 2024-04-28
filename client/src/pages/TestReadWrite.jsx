import {getTask} from "../api/readingDB";

const taskID = 'OQFVhGVZPV42hDtO3OTY'; // Replace with the actual ID you want to fetch

getTask(taskID).then(task => {
    if (task) {
        console.log('Task data:', task);
    }
}).catch(error => {
    // Handle any errors here
    console.error('Error fetching task:', error);
});

