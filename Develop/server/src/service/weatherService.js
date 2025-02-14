import dotenv from 'dotenv';
dotenv.config();
class WeatherService {
    constructor() {
        this.baseURL = 'http://api.openweathermap.org';
        this.apiKey = process.env.WEATHER_API_KEY;
        this.cityName = '';
    }
    async fetchLocationData(query) {
        const response = await fetch(query);
        const data = await response.json();
        return data[0];
    }
    destructureLocationData(locationData) {
        return {
            lat: locationData.lat,
            lon: locationData.lon
        };
    }
    buildGeocodeQuery() {
        return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`;
    }
    buildWeatherQuery(coordinates) {
        return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
    }
    async fetchAndDestructureLocationData() {
        const query = this.buildGeocodeQuery();
        const locationData = await this.fetchLocationData(query);
        return this.destructureLocationData(locationData);
    }
    async fetchWeatherData(coordinates) {
        const query = this.buildWeatherQuery(coordinates);
        const response = await fetch(query);
        return response.json();
    }
    parseCurrentWeather(response) {
        const current = response.list[0];
        return {
            date: new Date(current.dt * 1000).toLocaleDateString(),
            temp: Math.round(current.main.temp),
            humidity: current.main.humidity,
            windSpeed: Math.round(current.wind.speed),
            description: current.weather[0].description
        };
    }
    buildForecastArray(currentWeather, weatherData) {
        const forecast = [currentWeather];
        for (let i = 8; i < weatherData.length; i += 8) {
            const day = weatherData[i];
            forecast.push({
                date: new Date(day.dt * 1000).toLocaleDateString(),
                temp: Math.round(day.main.temp),
                humidity: day.main.humidity,
                windSpeed: Math.round(day.wind.speed),
                description: day.weather[0].description
            });
        }
        return forecast;
    }
    async getWeatherForCity(city) {
        try {
            this.cityName = city;
            const coordinates = await this.fetchAndDestructureLocationData();
            const weatherResponse = await this.fetchWeatherData(coordinates);
            const currentWeather = this.parseCurrentWeather(weatherResponse);
            return this.buildForecastArray(currentWeather, weatherResponse.list);
        }
        catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        }
    }
}
export default new WeatherService();
