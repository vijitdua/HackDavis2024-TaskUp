import {BrowserRouter, Routes, Route} from "react-router-dom";
import NoPage from "./pages/NoPage";
import LandingPage from "./pages/LandingPage";
import TestLeaderBoard from "./pages/TestLeaderBoard";
import TaskPagePopUp from "./pages/TaskPagePopUp";
import {createTheme, ThemeProvider} from "@mui/material";
import Leaderboard from "./pages/Leaderboard";
import TestData from "./pages/TestData";

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
                        backgroundColor: '#5356FF', // Example background color
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
                        <Route index element={<LandingPage/>}/>
                        <Route path="task" element={<TaskPagePopUp/>}/>
                        <Route path="leaderboard" element={<Leaderboard/>}/>
                        <Route path="*" element={<NoPage/>}/>
                        <Route path="t" element={<TestData/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>

    );
}

export default App;
