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
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, TooltipItem, CoreChartOptions} from 'chart.js';
// @ts-ignore
import {_DeepPartialObject} from "chart.js/dist/types/utils";
import ChanceOfRain from "../components/ChanceOfRain.tsx";


const todayDate = new Date();
const formattedDate: string = moment(todayDate).format("ddd, D MMM");

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

interface Props {
    isFetching: boolean;
    currentWeatherData?: WeatherData | undefined;
    currentPlace: string;
    todayForecast: Array<WeatherData>;
    tomorrowForecast: Array<WeatherData>;
    isNight: boolean;
    sunrise?: Date;
    sunset?: Date;
    nextDaysForecastLength: number;

}

export default function Home({isFetching, currentPlace, currentWeatherData, todayForecast, tomorrowForecast, isNight, sunset, sunrise, nextDaysForecastLength}: Props) {
    const [forecastSection, setForecastSection] = useState<"today" | "tomorrow">("today");
    const forecast: WeatherData[] = forecastSection === "today" ? todayForecast: tomorrowForecast;

    const chanceOfRain: number[] = forecast.map((data: WeatherData) => data.values.precipitationProbability);
    const times: string[] = forecast.map((data) => {
        return `${moment(data.time).format('hA')}`;
    });

    const data = {
        labels: times,
        datasets: [
            {
                label: "Chance of Rain (%)",
                data: chanceOfRain,
                backgroundColor: '#fbbc04',
                borderRadius: 5,
                barThickness: 10,
                borderSkipped: false,
            },
        ],
    };

    const options:  _DeepPartialObject<CoreChartOptions<"bar">> = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: TooltipItem<'bar'>) => `${tooltipItem.raw}% chance of rain`,
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
            },
            y: {
                grid: { drawBorder: false },
                beginAtZero: true,
                max: 100,
            },
        },
    };


    return (
        <BaseLayout>
            <FrameLayout isNight={isNight}>
                <Title isNight={isNight}/>
                <CurrentWeather currentPlace={currentPlace} formattedDate={formattedDate} weatherData={currentWeatherData}
                    isNight={isNight} sunset={sunset} sunrise={sunrise}
                />
                <div className="">
                    <ButtonSection forecastSection={forecastSection} setForecastSection={setForecastSection} isNight={isNight}
                        nextDaysForecastLength={nextDaysForecastLength}
                    />
                    {isFetching && (<div className="py-6 flex items-center justify-center">
                        <span className={`${isNight ? 'text-white': 'text-appBackground'} text-center`}>Loading...</span>
                    </div>)}

                    {forecastSection === "today" ? <TodayForecast forecast={todayForecast} isNight={isNight}/> : <TomorrowForecast forecast={tomorrowForecast} isNight={isNight}/>}
                </div>
                <ChanceOfRain isNight={isNight} data={data} options={options}/>
            </FrameLayout>
        </BaseLayout>
    )
}