export interface WeatherData {
    time: string,
    values: {
        cloudBase: number;
        cloudCeiling: number;
        cloudCover: number;
        dewPoint: number;
        freezingRainIntensity: number;
        humidity: number;
        precipitationProbability: number;
        pressureSurfaceLevel: number;
        rainIntensity: number;
        sleetIntensity: number;
        snowIntensity: number;
        temperature: number;
        temperatureApparent: number;
        uvHealthConcern: number;
        uvIndex: number;
        visibility: number;
        weatherCode: number;
        windDirection: number;
        windGust: number;
        windSpeed: number;
        temperatureAvg?: number | undefined;
        temperatureApparentAvg?: number | undefined;
        weatherCodeMax?: number | undefined;
        windSpeedAvg?: number | undefined;
        humidityAvg?: number | undefined;
        visibilityAvg?: number | undefined;
        uvIndexAvg: number | undefined;
        temperatureMin?: number | undefined;
        temperatureMax?: number | undefined;
    }
}

export interface WeatherIcon {
    day: string;  // Nom ou URL de l'icône pour le jour
    night: string;  // Nom ou URL de l'icône pour la nuit
}