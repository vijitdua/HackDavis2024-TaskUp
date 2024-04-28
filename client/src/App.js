import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import LandingPage from "./pages/LandingPage";
import TaskPagePopUp from "./pages/TaskPagePopUp";
import { createTheme, ThemeProvider } from "@mui/material";
import Leaderboard from "./pages/Leaderboard";
import TestData from "./pages/TestData";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage"; // Import HomePage

function App() {
    const { palette } = createTheme();
    const { augmentColor } = palette;
    const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

    const theme = createTheme({
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    // Add your custom CSS here
                    body: {
                        backgroundColor: '#fff', // Example background color
                    },
                    // You can override other global styles as well
                },
            },
        },
        palette: {
            // one: createColor('#81C4F8'),
            one: {
                main: '#378CE7', // Your custom color
                contrastText: '#ffffff' // This will ensure text is white
            }
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<LandingPage />} />
                        <Route path="leaderboard" element={<Leaderboard />} />
                        <Route path="create-task" element={<TaskPagePopUp />} /> {/* Add route for TaskPagePopUp */}
                        <Route path="home" element={<HomePage />} /> {/* Add route for HomePage */}
                        <Route path="login" element={<LoginPage />} />
                        <Route path="signup" element={<SignUpPage />} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
