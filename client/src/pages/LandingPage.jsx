import {withAuthInfo, useRedirectFunctions, useLogoutFunction} from '@propelauth/react'
import {Box, Button, Container, CssBaseline, Grid, Typography} from "@mui/material";
import HomePage from './HomePage.jsx';

const LandingPage = withAuthInfo((props) => {
    const logoutFunction = useLogoutFunction()
    const {redirectToLoginPage, redirectToSignupPage, redirectToAccountPage} = useRedirectFunctions()
    // Or if you want to make links instead
    // const { getLoginPageUrl, getSignupPageUrl, getAccountPageUrl } = useHostedPageUrls()

    if (props.isLoggedIn) {
        return (
            <HomePage/>
        )
    } else {
        return (
            <CssBaseline>
                <Container maxWidth='md'>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: '100px',
                            '& > *': {
                                alignItems: 'center',
                                margin: '10px',
                            }
                        }}>
                        <Typography variant='h3' component='h1'> You are not logged in</Typography>

                        <Grid container spacing={2} justifyContent="center" sx={{mt: '10px'}}>
                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="one"
                                    onClick={()=> redirectToLoginPage()}
                                >
                                    Log In
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={()=> redirectToSignupPage()}
                                >
                                    Sign Up
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </CssBaseline>
        )
    }
})

export default LandingPage
