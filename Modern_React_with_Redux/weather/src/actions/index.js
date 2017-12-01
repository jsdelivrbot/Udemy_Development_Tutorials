import axios from 'axios';

const API_KEY = 'ee74d7e4ba8024a1fc434db577fe8369';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
// API call:
// api.openweathermap.org/data/2.5/forecast?q={city name},{country code}

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
    const url = `${ROOT_URL}&q=${city},us`;
    const request = axios.get(url);

    return {
        type: FETCH_WEATHER,
        payload: request
    };
}
