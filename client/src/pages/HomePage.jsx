// Vijit
import {withAuthInfo, useRedirectFunctions, useLogoutFunction} from '@propelauth/react'
import {Box, Container, CssBaseline, Link, Typography} from "@mui/material";

function HomePage() {
    const logoutFunction = useLogoutFunction();
    const {redirectToLoginPage, redirectToSignupPage, redirectToAccountPage} = useRedirectFunctions();

    return (<CssBaseline>
        <Container maxWidth='lg'>
            <Typography variant='h5' component='h1'>
                You is logged in B^) </Typography>
            <button onClick={() => redirectToAccountPage()}>Account</button>
            <button onClick={() => logoutFunction(true)}>Logout</button>
        </Container>
    </CssBaseline>)
}

export default HomePage;