import './App.css'
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NextDays from "./pages/NextDays.tsx";
import "bootstrap-icons/font/bootstrap-icons.css"
import "./assets/weather-icons/css/weather-icons.min.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {WeatherData} from "./lib/types.ts";
import {getSunTimes, splitHourlyData} from "./lib/utils.ts";


const apiURL: string = import.meta.env.VITE_TOMORROW_API_URL;
const apiKey: string = import.meta.env.VITE_TOMORROW_API_KEY;
const nominatimApiURL: string = import.meta.env.VITE_NOMINATIM_API_URL;


function App() {
    const [isNight, setIsNight] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [currentPlace, setCurrentPlace] = useState<string>("--");
    const [currentWeatherData, setCurrentWeatherData] = useState<WeatherData | undefined>(undefined);
    const [todayForecast, setTodayForecast] = useState<Array<WeatherData>>([]);
    const [tomorrowForecast, setTomorrowForecast] = useState<Array<WeatherData>>([]);
    const [sunrise, setSunrise] = useState<Date>();
    const [sunset, setSunset] = useState<Date>();
    const [nextDaysForecast, setNextDaysForecast] = useState<Array<WeatherData>>([]);

    const fetchWeather = async (lat: number, long: number) => {
        try {
            const response = await axios.get(
                `${apiURL}/forecast?location=${lat},${long}&apikey=${apiKey}`,
                { headers: { "Content-Type": "application/json" } }
            );
            const { hourly, daily } = response.data.timelines;
            const { todayData, tomorrowData } = splitHourlyData(hourly);
            setTodayForecast(todayData);
            setTomorrowForecast(tomorrowData);
            setCurrentWeatherData(hourly[0]); // Premier élément comme météo actuelle
            setNextDaysForecast(daily.slice(2, daily.length));

        } catch (error) {
            console.error("Erreur lors de la récupération des données météo :", error);
        } finally {
            setIsFetching(false);
        }
    };

    const geocodingReverse = async (lat: number, long: number) => {
        try {
            const response = await axios.get(
                `${nominatimApiURL}/reverse?format=json&lat=${lat}&lon=${long}&addressdetails=1`
            );
            //const { address } = response.data;
            //const currentPlace_ = `${address.city || address.village}, ${address.country}`;
            const currentPlace_ = response.data.display_name;
            setCurrentPlace(currentPlace_);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'adresse :", error);
        }
    };


    useEffect(() => {
        if (!navigator.geolocation) {
            console.error("La géolocalisation n'est pas supportée par ce navigateur.");
            setIsFetching(false);
            return;
        }


        const fetchAndUpdateData = (latitude: number, longitude: number) => {
            const { sunrise_, sunset_ } = getSunTimes(latitude, longitude);
            const now = new Date();
            setIsNight(now < sunrise_ || now > sunset_);
            setSunset(sunset_);
            setSunrise(sunrise_);
            fetchWeather(latitude, longitude);
            geocodingReverse(latitude, longitude);
        };


        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                fetchAndUpdateData(latitude, longitude);

                const intervalId = setInterval(() => {
                    console.log("Fetching updated weather data...");
                    fetchAndUpdateData(latitude, longitude);
                }, 1800000); // 30 minutes

                return () => clearInterval(intervalId);
            },
            (error) => {
                console.error("Erreur lors de la récupération de la localisation :", error);
                setIsFetching(false);
            }
        );
    }, []);



    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home isFetching={isFetching} isNight={isNight} sunrise={sunrise}
                    currentWeatherData={currentWeatherData} currentPlace={currentPlace} sunset={sunset}
                    todayForecast={todayForecast} tomorrowForecast={tomorrowForecast} nextDaysForecastLength={nextDaysForecast.length}
                    />}
                />
                <Route path="/next-days" element={<NextDays isFetching={isFetching}
                    nextFourDaysForecast={nextDaysForecast}
                    />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
