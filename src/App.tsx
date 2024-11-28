import './App.css'
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NextSevenDays from "./pages/NextSevenDays.tsx";
import "bootstrap-icons/font/bootstrap-icons.css"
import "./assets/weather-icons/css/weather-icons.min.css";
import {useEffect, useState} from "react";
import axios from "axios";


const apiURL: string = import.meta.env.VITE_TOMORROW_API_URL;
const apiKey: string = import.meta.env.VITE_TOMORROW_API_KEY;

function App() {
    const [isFetching, setIsFetching] = useState<boolean>(true);


    const fetchRealTimeWeather = async (lat: number, long: number) => {
        await axios.get(`${apiURL}/realtime?location=${lat},${long}&apikey=${apiKey}`, {
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            console.log('response', response);
        }).catch((error) => {
            console.log('error', error);
        }).finally(()=>{
            setIsFetching(false);
        })
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // Fetch weather data using latitude and longitude
                console.log(latitude, longitude)
                fetchRealTimeWeather(latitude, longitude)
            },
            (error) => console.error("Error getting location:", error)
        );
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home isFetching={isFetching}/>}/>
                <Route path="/next-seven-days" element={<NextSevenDays/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
