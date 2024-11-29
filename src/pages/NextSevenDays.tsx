import Title from "../components/Title.tsx";
import FrameLayout from "../layouts/FrameLayout.tsx";
import BaseLayout from "../layouts/BaseLayout.tsx";
import {Link} from "react-router-dom";
import {WeatherData} from "../lib/types.ts";
import moment from "moment";
import {roundTemperature} from "../lib/utils.ts";
import WeatherIcon from "../components/WeatherIcon.tsx";


interface Props {
    isFetching: boolean;
    isNight: boolean;
    nextFourDaysForecast: WeatherData[];
}
export default function NextSevenDays({isFetching, isNight = false, nextFourDaysForecast}: Props){
    console.log('isi', nextFourDaysForecast[0])
    const firstData: WeatherData = nextFourDaysForecast[0];
    return(
        <BaseLayout>
            <FrameLayout isNight={isNight}>
                <Title isNight={isNight}/>
                <div className="my-5 px-4 flex flex-col gap-y-4">
                    <Link to="/">
                        <i className="bi bi-chevron-left font-bold text-app "></i>
                    </Link>
                    <h2 className="text-appBackground font-medium">Next <span className="font-bold">4 days</span></h2>
                    <div className="bg-white shadow-xl rounded px-4 py-6 flex flex-col gap-y-5">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-x-4 items-center">
                                <h5 className="text-sm text-appBackground font-bold">{isFetching ? "--" : moment(firstData?.time).format('dddd')}</h5>
                                {!isFetching && firstData?.values.weatherCodeMax && <WeatherIcon isNight={isNight} weatherCode={firstData.values.weatherCodeMax} classes="text-swatch_1" />}
                            </div>
                            <div className="flex gap-x-2 items-center">
                                <span className="text-appBackground text-sm font-bold">
                                    {isFetching ? "--" : roundTemperature(firstData?.values.temperatureAvg as number)}°C
                                </span>
                                <span className="text-gray-400 text-xs">{isFetching ? "--" : roundTemperature(firstData?.values.temperatureApparentAvg as number)}°C</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <div className="w-full flex space-x-10">
                                <div className="flex w-1/2">
                                    <div className="w-full flex justify-between items-center">
                                        <span style={{fontSize: "12px"}}
                                            className="font-bold text-appBackground">Wind</span>
                                        <span style={{fontSize: "10px"}} className="text-gray-400">12 m/h</span>
                                    </div>
                                </div>
                                <div className="flex w-1/2">
                                    <div className="w-full flex justify-between items-center">
                                        <span style={{fontSize: "12px"}}
                                            className="font-bold text-appBackground">Humidity</span>
                                        <span style={{fontSize: "10px"}} className="text-gray-400">55%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex space-x-10">
                                <div className="flex w-1/2">
                                    <div className="w-full flex justify-between items-center">
                                        <span style={{fontSize: "12px"}}
                                            className="font-bold text-appBackground">Visibility</span>
                                        <span style={{fontSize: "10px"}} className="text-gray-400">25 km</span>
                                    </div>
                                </div>
                                <div className="flex w-1/2">
                                    <div className="w-full flex justify-between items-center">
                                        <span style={{fontSize: "12px"}}
                                            className="font-bold text-appBackground">UV</span>
                                        <span style={{fontSize: "10px"}} className="text-gray-400">1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FrameLayout>
        </BaseLayout>
    )
}