import Title from "../components/Title.tsx";
import FrameLayout from "../layouts/FrameLayout.tsx";
import BaseLayout from "../layouts/BaseLayout.tsx";
import {Link} from "react-router-dom";
import {WeatherData} from "../lib/types.ts";
import FirstDayCard from "../components/FirstDayCard.tsx";
import moment from "moment";
import WeatherIcon from "../components/WeatherIcon.tsx";
import {roundTemperature} from "../lib/utils.ts";
import ProgressBar from "../components/ProgressBar.tsx";


interface Props {
    isFetching: boolean;
    nextFourDaysForecast: WeatherData[];
}
export default function NextSevenDays({isFetching, nextFourDaysForecast}: Props){
    const firstData: WeatherData = nextFourDaysForecast[0];
    const otherData: WeatherData[] = nextFourDaysForecast.slice(1, nextFourDaysForecast.length);
    console.log(otherData);
    return(
        <BaseLayout>
            <FrameLayout isNight={false}>
                <Title isNight={false}/>
                <div className="my-5 px-4 flex flex-col gap-y-4">
                    <Link to="/">
                        <i className="bi bi-chevron-left font-bold text-app "></i>
                    </Link>
                    <h2 className="text-appBackground font-medium">Next <span className="font-bold">4 days</span></h2>
                    <FirstDayCard firstData={firstData} isFetching={isFetching}/>
                    <div className="mt-4 px-1 flex flex-col gap-y-6">
                        {otherData.map((data: WeatherData, index) => (
                            <div className="w-full" key={index}>
                                <div className="grid grid-cols-5 grid-rows-1 w-full items-center">
                                    <div className="flex flex-col gap-y-1">
                                        <span className="uppercase font-bold text-xs">{moment(data.time).format('ddd')}</span>
                                        <div className="flex gap-x-1" style={{fontSize: "8.5px"}}>
                                            <i className="bi bi-droplet-fill text-swatch_1"></i>
                                            <span>{data.values.humidityAvg}%</span>
                                        </div>
                                    </div>
                                    <div>
                                        <WeatherIcon isNight={false} weatherCode={data.values.weatherCodeMax as number} classes="text-swatch_1 text-lg"/>
                                    </div>
                                    <div>
                                        <span className="font-bold text-sm text-gray-400">{roundTemperature(data.values.temperatureMin as number)}°C</span>
                                    </div>
                                    <div className="w-full">
                                        <ProgressBar maxTemp={data.values.temperatureMax as number}/>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-bold text-appBackground text-sm">{roundTemperature(data.values.temperatureMax as number)}°C</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </FrameLayout>
        </BaseLayout>
    )
}