import {getWeatherIcon} from "../lib/utils.ts";

interface Props {
    weatherCode: number;
    isNight: boolean;
}
export default function WeatherIcon({weatherCode, isNight}: Props){
    const iconClass: string = getWeatherIcon(weatherCode, isNight);
    return <i className={`wi ${iconClass}`} />;
}