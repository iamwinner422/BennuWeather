import moment from "moment/moment";
import WeatherIcon from "./WeatherIcon.tsx";
import {roundValues} from "../lib/utils.ts";
import ProgressBar from "./ProgressBar.tsx";
import {WeatherData} from "../lib/types.ts";

interface Props{
    data: WeatherData;
}

export default function WeatherRow({data}: Props){
    return (
        <div className="grid grid-cols-5 grid-rows-1 w-full items-center">
            <div className="flex flex-col gap-y-1">
                <span className="uppercase font-bold text-xs">{moment(data.time).format('ddd')}</span>
                <div className="flex gap-x-1" style={{fontSize: "8.5px"}}>
                    <i className="bi bi-droplet-fill text-swatch_1"></i>
                    <span>{data.values.humidityAvg}%</span>
                </div>
            </div>
            <div>
                <WeatherIcon isNight={false} weatherCode={data.values.weatherCodeMax as number}
                    classes="text-swatch_1 text-lg"/>
            </div>
            <div>
                <span
                    className="font-bold text-sm text-gray-400">{roundValues(data.values.temperatureMin as number)}°C</span>
            </div>
            <div className="w-full">
                <ProgressBar maxTemp={data.values.temperatureMax as number}/>
            </div>
            <div className="text-right">
                <span
                    className="font-bold text-appBackground text-sm">{roundValues(data.values.temperatureMax as number)}°C</span>
            </div>
        </div>
    )
}