// import {authenticateToken} from "../api/auth";
import HomePage from "./HomePage.jsx";
import {useEffect, useState} from "react";
import {Box, Container, CssBaseline, Typography} from "@mui/material";
import NotLoggedInLandingPage from "./NotLoggedInLandingPage";
import {authenticateToken} from "../api/auth";
import {fetchMyTasks} from "../api/taskManagement";

function LandingPage() {
    const [loginStatus, setLoginStatus] = useState(true);

    async function checkLoginStatus() {
        let status = await authenticateToken();
        setLoginStatus(status);
    }

    useEffect(() => {
        checkLoginStatus();
    }, []);


    if (loginStatus === true) {
        return <HomePage/>
    } else if (loginStatus === false) {
        return <NotLoggedInLandingPage/>
    } else {
        return <CssBaseline>
            <Typography variant='h4' component='h1'> The page is loading </Typography>
            {/*    Add a loading page*/}
        </CssBaseline>
    }
}

export default LandingPage;