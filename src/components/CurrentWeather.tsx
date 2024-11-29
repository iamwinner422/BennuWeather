import { WeatherData } from "../lib/types.ts";
import {roundTemperature} from "../lib/utils.ts";
import moment from "moment";
import WeatherIcon from "./WeatherIcon.tsx";



interface Props {
    formattedDate: string;
    currentPlace: string;
    weatherData?: WeatherData | undefined;
    isNight: boolean;
    sunrise?: Date;
    sunset?: Date;
}


export default function CurrentWeather({ formattedDate, currentPlace, weatherData, isNight, sunset, sunrise }: Props) {
    const formattedTemperature = (): string => {
        if (!weatherData || !weatherData.values || !weatherData.values.temperature) {
            //console.log("Pas de données météo valides :", weatherData);
            return "N/A";
        }
        return roundTemperature(weatherData.values.temperature).toString();
    };

    return (
        <div className="my-5">
            <div className="flex items-center gap-4 justify-center">
                <div>
                    {weatherData?.values.weatherCode && <WeatherIcon weatherCode={weatherData?.values.weatherCode} isNight={isNight} classes="text-swatch_1"/>}
                </div>
                <div className="flex flex-col">
                    <h3 className={`text-lg font-bold ${isNight ? 'text-white' : 'text-appBackground'}`}>Today</h3>
                    <span style={{ fontSize: "9px" }} className={`font-medium ${isNight ? 'text-white' : 'text-appBackground'}`}>{formattedDate}</span>
                </div>
            </div>
            <div className="flex flex-col gap-y-3 items-center justify-center">
                <div className="flex mt-5">
                    <h2 className={`${isNight ? 'text-white' : 'text-appBackground'} text-7xl font-bold`}>{formattedTemperature()}</h2>
                    <span className={`${isNight ? 'text-white' : 'text-appBackground'} text-lg`}>°C</span>
                </div>
                <span className="${isNight ? 'text-white': 'text-appBackground'}` text-xs">{currentPlace}</span>
                <span className="${isNight ? 'text-white': 'text-appBackground'}` text-xs">
                    Feels Like {roundTemperature(weatherData?.values?.temperatureApparent as number) || "N/A"} °C • {isNight ? `Sunset: ${moment(sunset).format('HH:mm')}` : `Sunrise: ${moment(sunrise).format('HH:mm')}`}
                </span>
            </div>
        </div>
    );
}
