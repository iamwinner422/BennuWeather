import './App.css'
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NextSevenDays from "./pages/NextSevenDays.tsx";
import "bootstrap-icons/font/bootstrap-icons.css"
import "./assets/weather-icons/css/weather-icons.min.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {WeatherData} from "./lib/types.ts";




const apiURL: string = import.meta.env.VITE_TOMORROW_API_URL;
const apiKey: string = import.meta.env.VITE_TOMORROW_API_KEY;
const nominatimApiURL: string = import.meta.env.VITE_NOMINATIM_API_URL;



function App() {
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [currentWeatherData, setCurrentWeatherData] = useState<WeatherData | null>(null);

    const fetchRealTimeWeather = async (lat: number, long: number) => {
        await axios.get(`${apiURL}/realtime?location=${lat},${long}&apikey=${apiKey}`, {
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            console.log('response', response);
            setCurrentWeatherData(response.data)
        }).catch((error) => {
            console.log('error', error);
        }).finally(()=>{
            setIsFetching(false);
        })
    };

    const geocodingReverse = async (lat: number, long: number)=> {
        await axios.get(`${nominatimApiURL}/reverse?format=json&lat=${lat}&lon=${long}&addressdetails=1`)
            .then((response) => {
                const {address} = response.data;
                const currentPlace = address.city || address.village;
                console.log("add", currentPlace);
            }).catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // Fetch weather data using latitude and longitude
                console.log(latitude, longitude)
                fetchRealTimeWeather(latitude, longitude)
                geocodingReverse(latitude, longitude);
            },
            (error) => console.error("Error getting location:", error)
        );
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home isFetching={isFetching} currentWeatherData={currentWeatherData}/>}/>
                <Route path="/next-seven-days" element={<NextSevenDays/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
