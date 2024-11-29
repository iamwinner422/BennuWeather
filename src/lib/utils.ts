import {WeatherData} from "./types.ts";
import SunCalc from 'suncalc';
function splitHourlyData(hourlyData: Array<WeatherData>) {
    const now = new Date();
    const today = now.toISOString().split("T")[0]; // Date d'aujourd'hui au format YYYY-MM-DD
    const currentHour = now.getHours(); // Heure actuelle

    const todayData = hourlyData.filter((item) => {
        const itemDate = item.time.split("T")[0]; // Date de l'élément au format YYYY-MM-DD
        const itemHour = parseInt(item.time.split("T")[1].split(":")[0]); // Heure de l'élément
        return itemDate === today && itemHour >= currentHour && itemHour <= 23 && itemHour % 2 === 0; //Par paire
        // actuelle à 23h
    });

    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1); // Date de demain
    const tomorrowDate = tomorrow.toISOString().split("T")[0]; // Demain au format YYYY-MM-DD

    const tomorrowData = hourlyData.filter((item) => {
        const itemDate = item.time.split("T")[0]; // Date de l'élément
        const itemHour = parseInt(item.time.split("T")[1].split(":")[0]); // Heure de l'élément
        return itemDate === tomorrowDate && itemHour >= 0 && itemHour <= 23 && itemHour % 2 === 0; //Par paire
    });

    return { todayData, tomorrowData };
}

function roundTemperature(temperature: number) {
    return Math.round(temperature);
}



function getSunTimes(latitude: number, longitude: number) {
    const times = SunCalc.getTimes(new Date(), latitude, longitude);
    return {
        sunrise_: times.sunrise, // Heure du lever
        sunset_: times.sunset   // Heure du coucher
    };
}

interface WeatherIcon {
    day: string;  // Nom ou URL de l'icône pour le jour
    night: string;  // Nom ou URL de l'icône pour la nuit
}


const weatherIcons: Record<number, WeatherIcon> = {
    1000: { day: "wi-day-sunny", night: "wi-night-clear" },
    1100: { day: "wi-day-cloudy", night: "wi-night-alt-cloudy" },
    1101: { day: "wi-cloud", night: "wi-cloud" },
    4000: { day: "wi-day-rain", night: "wi-night-alt-rain" },
    8000: { day: "wi-day-thunderstorm", night: "wi-night-alt-thunderstorm" },
};

function getWeatherIcon(weatherCode: number, isNight:boolean) {
    const icon: WeatherIcon = weatherIcons[weatherCode];
    return isNight ? icon.night : icon.day;
}


export {splitHourlyData, roundTemperature, getWeatherIcon, getSunTimes}