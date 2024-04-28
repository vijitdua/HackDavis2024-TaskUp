import Axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export async function fetchUserStats(username){
    console.log("Attempting to fetch some other user's stats");
    try{
        const res = await Axios.get(`${process.env.REACT_APP_BACKEND}/user-stats/${username}`);
        console.log(`Server response: `, res.data.res);
        if (res.data.res === `Error: invalid username`) {
            return false;
        }
        if (res.data.res === `Error: username not received`) {
            return false;
        }
        if (res.data.res === `success`) {
            return res.data; //data is json with {res: `success`, firstName: firstName, lastName: lastName, numTasksDoneToday:numTasksDoneToday}
        }
    }catch(e){
        console.log("An error occurred:", e);
        return false;
    }
}

export async function addAFriend(username){
    console.log("Trying to add a friend");
    const token = cookie.get("token");
    try{
        const res = await Axios.post(`${process.env.REACT_APP_BACKEND}/add-friend`, {token: token, username:username});
        console.log(`Server response: `, res.data.res);
        if (res.data.res === `Error: invalid username`) {
            return "Invalid Username";
        }
        if (res.data.res === `Error: data incomplete`) {
            return "Data Incomplete";
        }
        if (res.data.res === `success`) {
            return true; //data is json with {res: `success`, firstName: firstName, lastName: lastName, numTasksDoneToday:numTasksDoneToday}
        }
        return "Unknown error";
    }catch(e){
        console.log("An error occurred:", e);
        return "An unknown error occurred";
    }
}