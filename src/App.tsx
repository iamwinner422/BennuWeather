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
    const [currentPlace, setCurrentPlace] = useState<string>("--");
    const [currentWeatherData, setCurrentWeatherData] = useState<WeatherData | undefined>(undefined);

    const fetchWeather = async (lat: number, long: number) => {
        await axios.get(`${apiURL}/forecast?location=${lat},${long}&apikey=${apiKey}`, {
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            //console.log('response', response.data.timelines);
            const {hourly} = response.data.timelines;
            const { todayData, tomorrowData } = splitHourlyData(hourly);
            console.log('today', todayData, 'tomorrow', tomorrowData)
            setCurrentWeatherData(hourly[0]);
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
                const currentPlace_: string = address.city || address.village + ', ' + address.country;
                setCurrentPlace(currentPlace_);
                console.log("Place Response", currentPlace_)
            }).catch((error) => {
                console.log(error)
            })
    }

    function splitHourlyData(hourlyData: Array<WeatherData>) {
        const now = new Date();
        const today = now.toISOString().split("T")[0]; // Date d'aujourd'hui au format YYYY-MM-DD
        const currentHour = now.getHours(); // Heure actuelle

        const todayData = hourlyData.filter((item) => {
            const itemDate = item.time.split("T")[0]; // Date de l'élément au format YYYY-MM-DD
            const itemHour = parseInt(item.time.split("T")[1].split(":")[0]); // Heure de l'élément
            return itemDate === today && itemHour >= currentHour && itemHour <= 23; // Aujourd'hui, de l'heure actuelle à 23h
        });

        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1); // Date de demain
        const tomorrowDate = tomorrow.toISOString().split("T")[0]; // Demain au format YYYY-MM-DD

        const tomorrowData = hourlyData.filter((item) => {
            const itemDate = item.time.split("T")[0]; // Date de l'élément
            const itemHour = parseInt(item.time.split("T")[1].split(":")[0]); // Heure de l'élément
            return itemDate === tomorrowDate && itemHour >= 0 && itemHour <= 23; // Demain de 00h à 23h
        });

        return { todayData, tomorrowData };
    }


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // Fetch weather data using latitude and longitude
                console.log(latitude, longitude)
                fetchWeather(latitude, longitude)
                geocodingReverse(latitude, longitude);

            },
            (error) => console.error("Error getting location:", error)
        );
    }, []);


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home isFetching={isFetching} currentWeatherData={currentWeatherData} currentPlace={currentPlace}/>}/>
                <Route path="/next-seven-days" element={<NextSevenDays/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
