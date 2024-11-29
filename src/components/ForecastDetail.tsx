import {WeatherData} from "../lib/types.ts";
import moment from "moment";
import {roundTemperature} from "../lib/utils.ts";


interface Props {
    data: WeatherData
}
export default function ForecastDetail({data}: Props) {
    return (
        <>
            <span style={{fontSize: "10px"}} className="text-white group-hover:text-swatch_2 font-bold uppercase text-center">{moment(data.time).format('hA')}</span>
            <div className="bg-appBackground/40 group-hover:bg-swatch_3 mx-auto h-7 w-7 rounded-full flex items-center justify-center my-1">
                <i className="wi wi-sunset text-white group-hover:text-swatch_1 text-center"></i>
            </div>
            <div style={{fontSize: "12px"}} className="flex items-center justify-center group-hover:text-swatch_2 text-white font-bold">
                {roundTemperature(data.values.temperature)} <span style={{fontSize: "9px"}} className="text-xs ml-1 text-center ">°C</span>
            </div>
        </>
    )
}