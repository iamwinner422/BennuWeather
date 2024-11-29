import BaseLayout from "../layouts/BaseLayout.tsx";
import FrameLayout from "../layouts/FrameLayout.tsx";
import Title from "../components/Title.tsx";
import moment from "moment";
import {WeatherData} from "../lib/types.ts";
// @ts-expect-error
import 'swiper/css';
// @ts-expect-error
import 'swiper/css/pagination';
import CurrentWeather from "../components/CurrentWeather.tsx";
import ButtonSection from "../components/ButtonSection.tsx";
import TodayForecast from "../components/TodayForecast.tsx";
import {useState} from "react";
import TomorrowForecast from "../components/TomorrowForecast.tsx";


const todayDate = new Date();
const formattedDate: string = moment(todayDate).format("ddd, D MMM");


interface Props {
    isFetching: boolean;
    currentWeatherData: WeatherData | null;
    currentPlace: string;
}

export default function Home({isFetching, currentPlace}: Props) {
    const [forecastSection, setForecastSection] = useState<"today" | "tomorrow">("today");
    return (
        <BaseLayout>
            <FrameLayout>
                <Title/>
                <CurrentWeather currentPlace={currentPlace} formattedDate={formattedDate}/>
                <div className="">
                    <ButtonSection forecastSection={forecastSection} setForecastSection={setForecastSection}/>
                    {forecastSection === "today" ? <TodayForecast/> : <TomorrowForecast/>}
                </div>
                <div className="px-6 mt-5 flex flex-col gap-y-4">
                    <h4 className="font-bold text-white">Chance of rain</h4>
                    <div className="flex w-full">
                        <div className="w-1/6 flex flex-col text-white font-medium text-xs gap-y-3">
                            <span>sunny</span>
                            <span>rainy</span>
                            <span>heavy rain</span>
                        </div>
                        <div className="w-auto"></div>
                    </div>
                </div>
            </FrameLayout>
        </BaseLayout>
    )
}