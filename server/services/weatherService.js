// ./services/weatherService.js
// 기상청 API 연결

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
    // console.log("weather params", base_date, base_time, nx, ny);

    const truncatedNx = Math.trunc(nx);
    const truncatedNy = Math.trunc(ny);

    console.log("기상청 서비스키 : ", config.weather.serviceKey);
    
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

        const response = await axios.get('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst', {
            params : {
                serviceKey : config.weather.serviceKey, // 서비스 키를 인코딩
                numOfRows : 10,
                pageNo : 1,
                dataType : 'JSON',
                base_date,
                base_time,
                nx : truncatedNx,
                ny : truncatedNy
            }
        });
        // response.data를 사용하여 JSON 데이터를 반환
        // console.log("res data (JSON):", JSON.stringify(response.data, null, 2));
        
        return response.data;

    } catch (error) {
        console.error("Weather API Error:", error);
        throw error;
    }
};
