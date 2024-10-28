/**
 * 기상청 관련
 */

import fetch from 'node-fetch';
import config from '../config/index.js';
import axios from 'axios';

/**
 * 초단기 실황 : 오늘의 예보 가져오기
 * @param {*} base_date 
 * @param {*} base_time 
 * @param {*} nx 
 * @param {*} ny 
 * @returns 
 */
export const getWeatherData = async (base_date, base_time, nx, ny) => {
    const truncatedNx = Math.trunc(nx);
    const truncatedNy = Math.trunc(ny);
    
    try {
        /*
        const response = await fetch(
            `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${config.weather.key}&numOfRows=10&pageNo=1&base_date=${base_date}&base_time=${base_time}&nx=${truncatedNx}&ny=${truncatedNy}&dataType=JSON`
        );
        if (!response.ok) {
            const errorText = await response.text(); // 응답 텍스트를 가져옴
            console.error("Weather API Error:", errorText); // 오류 로그 출력
            throw new Error('Failed to fetch weather data');
        }
        */
        const response = await axios.get('`http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst', {
            params : {
                serviceKey: config.weather.key,
                pageNo : 1,
                numOfRows : 10,
                dataType : 'JSON',
                base_date,
                base_time,
                truncatedNx,
                truncatedNy
            }
        });
        return response.json();

    } catch (error) {
        console.error("Weather API Error:", error);
        throw error;
    }
};
