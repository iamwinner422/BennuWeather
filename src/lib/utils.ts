import {WeatherData} from "./types.ts";

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

const weatherCodeMapping = {
    // Ciel clair
    1000: {
        day: 'wi-day-sunny',
        night: 'wi-night-clear',
    },

    // Partiellement nuageux
    1100: {
        day: 'wi-day-cloudy',
        night: 'wi-night-alt-cloudy',
    },

    // Nuageux
    1001: {
        day: 'wi-cloudy',
        night: 'wi-cloudy',
    },

    // Brume / Brouillard
    4000: {
        day: 'wi-fog',
        night: 'wi-fog',
    },

    // Pluie légère
    4001: {
        day: 'wi-day-rain',
        night: 'wi-night-alt-rain',
    },

    // Pluie modérée
    4200: {
        day: 'wi-day-rain-mix',
        night: 'wi-night-alt-rain-mix',
    },

    // Pluie forte
    4201: {
        day: 'wi-day-rain-wind',
        night: 'wi-night-alt-rain-wind',
    },

    // Neige légère
    5001: {
        day: 'wi-day-snow',
        night: 'wi-night-alt-snow',
    },

    // Neige modérée
    5600: {
        day: 'wi-day-snow-wind',
        night: 'wi-night-alt-snow',
    }
};

const weatherIcons = {
    1000: { day: "wi-day-sunny", night: "wi-night-clear" },
    1100: { day: "wi-day-cloudy", night: "wi-night-alt-cloudy" },
    1101: { day: "wi-cloud", night: "wi-cloud" },
    4000: { day: "wi-day-rain", night: "wi-night-alt-rain" },
    8000: { day: "wi-day-thunderstorm", night: "wi-night-alt-thunderstorm" },
};

function getWeatherIcon(weatherCode: number, isNight:boolean) {
    const icon = weatherIcons[weatherCode];
    return isNight ? icon.night : icon.day;
}


export {splitHourlyData, roundTemperature}