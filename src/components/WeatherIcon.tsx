import {getWeatherIcon} from "../lib/utils.ts";

interface Props {
    weatherCode: number;
    isNight: boolean;
    classes?: string | undefined;
}
export default function WeatherIcon({weatherCode, isNight, classes}: Props){
    const iconClass: string = getWeatherIcon(weatherCode, isNight);
    return <i className={`wi ${iconClass} ${classes}`} />;
}