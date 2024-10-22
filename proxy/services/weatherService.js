/**
 * 기상청 관련
 */

import fetch from 'node-fetch';
import config from '../config/index.js';

export const getWeatherData = async (base_date, base_time, nx, ny) => {
    const truncatedNx = Math.trunc(nx);
    const truncatedNy = Math.trunc(ny);
    
    const response = await fetch(
        `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${config.weather.key}&numOfRows=10&pageNo=1&base_date=${base_date}&base_time=${base_time}&nx=${truncatedNx}&ny=${truncatedNy}&dataType=JSON`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    return response.json();
};