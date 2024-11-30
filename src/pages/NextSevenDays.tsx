import Title from "../components/Title.tsx";
import FrameLayout from "../layouts/FrameLayout.tsx";
import BaseLayout from "../layouts/BaseLayout.tsx";
import {Link} from "react-router-dom";
import {WeatherData} from "../lib/types.ts";
import FirstDayCard from "../components/FirstDayCard.tsx";
import WeatherRow from "../components/WeatherRow.tsx";


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
                                <WeatherRow data={data} />
                            </div>
                        ))}
                    </div>
                </div>
            </FrameLayout>
        </BaseLayout>
    )
}