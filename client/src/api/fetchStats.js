import Axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export async function fetchStats(username){
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
            return "a"; //todo
        }
    }catch(e){

    }
}