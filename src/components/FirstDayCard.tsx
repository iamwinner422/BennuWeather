import moment from "moment/moment";
import WeatherIcon from "./WeatherIcon.tsx";
import {roundValues} from "../lib/utils.ts";
import {WeatherData} from "../lib/types.ts";


interface Props {
    firstData: WeatherData;
    isFetching: boolean;
}
export default function FirstDayCard({firstData, isFetching}: Props){
    return (
        <div className="bg-white shadow-xl rounded-lg px-4 py-6 flex flex-col gap-y-5">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-4 items-center">
                    <h5 className="text-sm text-appBackground font-bold">{isFetching ? "--" : moment(firstData?.time).format('dddd')}</h5>
                    {!isFetching && firstData?.values.weatherCodeMax &&
                        <WeatherIcon isNight={false} weatherCode={firstData.values.weatherCodeMax}
                            classes="text-swatch_1"/>}
                </div>
                <div className="flex gap-x-2 items-center">
                                <span className="text-appBackground text-sm font-bold">
                                    {isFetching ? "--" : roundValues(firstData?.values.temperatureMax as number)}°C
                                </span>
                    <span
                        className="text-gray-400 text-xs">{isFetching ? "--" : roundValues(firstData?.values.temperatureMin as number)}°C</span>
                </div>
            </div>
            <div className="flex flex-col gap-y-2">
                <div className="w-full flex space-x-10">
                    <div className="flex w-1/2">
                        <div className="w-full flex justify-between items-center">
                            <span style={{fontSize: "12px"}} className="font-bold text-appBackground">Wind</span>
                            <span style={{fontSize: "10px"}} className="text-gray-400">
                                            {isFetching ? '--' : firstData?.values.windSpeedAvg} m/h
                                        </span>
                        </div>
                    </div>
                    <div className="flex w-1/2">
                        <div className="w-full flex justify-between items-center">
                            <span style={{fontSize: "12px"}} className="font-bold text-appBackground">Humidity</span>
                            <span style={{fontSize: "10px"}} className="text-gray-400">
                                            {isFetching ? '--' : firstData?.values.humidityAvg} %
                                        </span>
                        </div>
                    </div>
                </div>
                <div className="w-full flex space-x-10">
                    <div className="flex w-1/2">
                        <div className="w-full flex justify-between items-center">
                                        <span style={{fontSize: "12px"}}
                                            className="font-bold text-appBackground">Visibility</span>
                            <span style={{fontSize: "10px"}} className="text-gray-400">
                                            {isFetching ? '--' : firstData?.values.visibilityAvg} km
                                        </span>
                        </div>
                    </div>
                    <div className="flex w-1/2">
                        <div className="w-full flex justify-between items-center">
                                        <span style={{fontSize: "12px"}}
                                            className="font-bold text-appBackground">UV</span>
                            <span style={{fontSize: "10px"}} className="text-gray-400">
                                            {isFetching ? '--' : firstData?.values.uvIndexAvg}
                                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}