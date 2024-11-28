import BaseLayout from "../layouts/BaseLayout.tsx";
import FrameLayout from "../layouts/FrameLayout.tsx";
import Title from "../components/Title.tsx";
import moment from "moment";
import {WeatherData} from "../lib/types.ts";



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
                </div>
            </FrameLayout>
        </BaseLayout>
    )
}