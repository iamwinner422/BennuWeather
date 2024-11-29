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

export {splitHourlyData, roundTemperature}