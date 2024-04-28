import {BrowserRouter, Routes, Route} from "react-router-dom";
import NoPage from "./pages/NoPage";
import LandingPage from "./pages/LandingPage";
import TestProp from "./pages/TestProp";

function App() {
    return (<BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<LandingPage/>}/>
                    <Route path="*" element={<NoPage/>}/>
                    <Route path="testProp" element={<TestProp/>}/>
                </Route>
            </Routes>
        </BrowserRouter>

    );
}

export default App;
