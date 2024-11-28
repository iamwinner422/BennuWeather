import BaseLayout from "../layouts/BaseLayout.tsx";
import FrameLayout from "../layouts/FrameLayout.tsx";
import Title from "../components/Title.tsx";
import moment from "moment";
import {WeatherData} from "../lib/types.ts";
import {Link} from "react-router-dom";



const todayDate = new Date();
const formattedDate: string = moment(todayDate).format("ddd, D MMM");


interface Props {
    isFetching: boolean;
    currentWeatherData: WeatherData | null;
}

export default function Home({isFetching}: Props) {
    return (
        <BaseLayout>
            <FrameLayout>
                <Title/>
                <div className="py-4">
                    <div className="flex items-center gap-4 justify-center">
                        <div>
                            {isFetching ?
                                <span className="text-swatch_1 font-bold">--</span> :
                                <i className="wi wi-night-sleet text-swatch_1"></i>
                            }
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-lg font-bold text-white">Today</h3>
                            <span style={{fontSize: "9px"}} className="text-white">{formattedDate}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3 items-center justify-center">
                        <div className="flex mt-6">
                            <h2 className="text-white text-7xl">28</h2>
                            <span className="text-white text-lg">°C</span>
                        </div>
                        <span className="text-white text-xs">Ville</span>
                        <span className="text-white text-xs">Fill Like ° Sunset</span>
                    </div>
                </div>
                <div className="mt-2">
                    <div className="px-8 flex items-baseline justify-between">
                        <button className="text-white font-semibold text-sm flex flex-col items-center gap-y-1">
                            Today
                            <div className="bg-white rounded-full h-1.5 w-1.5"></div>
                        </button>
                        <button className="text-white font-semibold text-sm">Tomorrow</button>
                        <Link to="/next-seven-days" className="text-swatch_1 font-semibold text-sm flex items-center justify-center">
                            Next 7 Days
                            <i className="bi bi-chevron-right text-xs"></i>
                        </Link>
                    </div>
                </div>
            </FrameLayout>
        </BaseLayout>
    )
}