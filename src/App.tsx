import './App.css'
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NextSevenDays from "./pages/NextSevenDays.tsx";
import "bootstrap-icons/font/bootstrap-icons.css"
function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/next-seven-days" element={<NextSevenDays/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
