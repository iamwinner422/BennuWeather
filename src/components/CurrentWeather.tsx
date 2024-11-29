import { WeatherData } from "../lib/types.ts";
import {roundTemperature} from "../lib/utils.ts";
import moment from "moment";

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
                    <i className="wi wi-cloud text-swatch_1"></i>
                </div>
                <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-white">Today</h3>
                    <span style={{ fontSize: "9px" }} className="text-white">{formattedDate}</span>
                </div>
            </div>
            <div className="flex flex-col gap-y-3 items-center justify-center">
                <div className="flex mt-5">
                    <h2 className="text-white text-7xl">{formattedTemperature()}</h2>
                    <span className="text-white text-lg">°C</span>
                </div>
                <span className="text-white text-xs">{currentPlace}</span>
                <span className="text-white text-xs">
                    Feels Like {roundTemperature(weatherData?.values?.temperatureApparent as number) || "N/A"} °C • {isNight ? `Sunset: ${moment(sunset).format('HH:mm')}` : `Sunrise: ${moment(sunrise).format('HH:mm')}`}
                </span>
            </div>
        </div>
    );
}
