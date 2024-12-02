import {WeatherData, WeatherIcon} from "./types.ts";
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

function roundValues(value: number) {
    return Math.round(value);
}


function getSunTimes(latitude: number, longitude: number) {
    const times = SunCalc.getTimes(new Date(), latitude, longitude);
    return {
        sunrise_: times.sunrise, // Heure du lever
        sunset_: times.sunset   // Heure du coucher
    };
}


const weatherIcons: Record<number, WeatherIcon> = {
    1000: {
        day: "wi-day-sunny",
        night: "wi-night-clear"
    },
    1100: {
        day: "wi-day-sunny",
        night: "wi-night-clear"
    },

    // Nuageux
    1001: {
        day: "wi-cloudy",
        night: "wi-cloudy"
    },
    1101: {
        day: "wi-day-cloudy",
        night: "wi-night-alt-cloudy"
    },
    1102: {
        day: "wi-day-cloudy",
        night: "wi-night-alt-cloudy"
    },

    // Brouillard
    2000: {
        day: "wi-fog",
        night: "wi-fog"
    },
    2100: {
        day: "wi-day-fog",
        night: "wi-night-fog"
    },

    // Pluie
    4000: {
        day: "wi-day-sprinkle",
        night: "wi-night-alt-sprinkle"
    },
    4001: {
        day: "wi-day-rain",
        night: "wi-night-alt-rain"
    },
    4200: {
        day: "wi-day-rain-mix",
        night: "wi-night-alt-rain-mix"
    },
    4201: {
        day: "wi-day-rain-wind",
        night: "wi-night-alt-rain-wind"
    },

    // Neige
    5000: {
        day: "wi-day-snow",
        night: "wi-night-alt-snow"
    },
    5001: {
        day: "wi-day-snow",
        night: "wi-night-alt-snow"
    },
    5100: {
        day: "wi-day-snow",
        night: "wi-night-alt-snow"
    },
    5101: {
        day: "wi-day-snow-wind",
        night: "wi-night-alt-snow-wind"
    },

    // Pluie verglaçante
    6000: {
        day: "wi-day-sleet",
        night: "wi-night-alt-sleet"
    },
    6001: {
        day: "wi-day-sleet",
        night: "wi-night-alt-sleet"
    },

    // Grêle
    7000: {
        day: "wi-hail",
        night: "wi-hail"
    },
    7101: {
        day: "wi-hail",
        night: "wi-hail"
    },

    // Orage
    8000: {
        day: "wi-day-thunderstorm",
        night: "wi-night-alt-thunderstorm"
    }
};

function getWeatherIcon(weatherCode: number, isNight:boolean) {
    const icon: WeatherIcon = weatherIcons[weatherCode];
    return isNight ? icon?.night : icon?.day;
}


export {splitHourlyData, roundValues, getWeatherIcon, getSunTimes}