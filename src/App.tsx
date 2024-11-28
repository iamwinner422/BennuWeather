import './App.css'
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NextSevenDays from "./pages/NextSevenDays.tsx";
import "bootstrap-icons/font/bootstrap-icons.css"
import "./assets/weather-icons/css/weather-icons.min.css";
import {useEffect} from "react";


function App() {

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // Fetch weather data using latitude and longitude
                console.log(latitude, longitude)
            },
            (error) => console.error("Error getting location:", error)
        );
    }, []);
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
