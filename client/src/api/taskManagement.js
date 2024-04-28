import Axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();


// Create a room
export async function createTask(taskData) {
    console.log("Attempting to create a task");
    const token = cookie.get("token");
    taskData = {...taskData, token: token};
    try {
        let res = await Axios.post(`${process.env.REACT_APP_BACKEND}/create-task`, taskData);
        console.log(`Server response: `, res.data.res);
        if (res.data.res === `Error: data incomplete`) {
            return "Please fill all fields before you create a task";
        }
        if (res.data.res === `Error: invalid token`) {
            return "There was an error with your login data, try signing out and logging in again";
        }
        if (res.data.res === `Error: token not received`) {
            return "Unable to process login data, please make sure you are logged in first";
        }
        if (res.data.res === `success`) {
            return true;
        }

    } catch (error) {
        console.log("An error occurred:", error);
        return ("An unknown error occurred");
    }
    return "unknown error";

}

//
export async function fetchMyTasks(){
    console.log("Attempting to fetch user's tasks");
    const token = cookie.get("token");
    try{
        const res = await Axios.get(`${process.env.REACT_APP_BACKEND}/my-tasks/${token}`);
        console.log(`Server response: `, res.data.res);
        if (res.data.res === `Error: invalid token`) {
            return false;
        }
        if (res.data.res === `Error: token not received`) {
            return false;
        }
        if (res.data.res === `success`) {
            return res.data.tasks;
        }

    } catch (error) {
    console.log("An error occurred:", error);
    return false;
}

}

export async function deleteTask(taskID) {
    console.log("Attempting to delete a task");
    const token = cookie.get("token");
    try {
        const res = await Axios.delete(`${process.env.REACT_APP_BACKEND}/delete-task`, {data: {token, taskID}});
        console.log(`Server response: `, res.data.res);
        if (res.data.res === "Error: token not received") {
            return "Unable to process login data, please make sure you are logged in first";
        }
        if (res.data.res === "Error: data incomplete") {
            return "Please ensure all fields are properly filled";
        }
        if (res.data.res === "Error: invalid token") {
            return "There was an error with your login data, try signing out and logging in again";
        }
        if (res.data.res === "success") {
            return true;
        }
        return "An unknown error occurred";
    } catch (error) {
        console.error("An error occurred:", error);
        return "An unknown error occurred";
    }
}

export async function setTaskCompletion(taskID, isCompleted) {
    console.log("Attempting to set task completion status");
    const token = cookie.get("token");
    try {
        const res = await Axios.post(`${process.env.REACT_APP_BACKEND}/set-task-completion`, {token, taskID, isCompleted});
        console.log(`Server response: `, res.data.res);
        if (res.data.res === "Error: token not received") {
            return false;
        }
        if (res.data.res === "Error: data incomplete") {
            return false;
        }
        if (res.data.res === "Error: invalid token") {
            return false;
        }
        if (res.data.res === "success") {
            return true;
        }
        return false;
    } catch (error) {
        console.error("An error occurred:", error);
        return false;
    }
}