// ./services/forecastWeatherService.js

import axios from 'axios';
import config from '../config/index.js';

// 단기 예보
export const getForecastData = async (base_date, base_time, nx, ny) => {
    const truncatedNx = Math.trunc(nx);
    const truncatedNy = Math.trunc(ny);

    try {
        const response = await axios.get('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst', {
            params: {
                serviceKey: config.weather.serviceKey,
                numOfRows: 10,
                pageNo: 1,
                dataType: 'JSON',
                base_date,
                base_time,
                nx: truncatedNx,
                ny: truncatedNy
            }
        });
        // console.log(response);

        return response.data;
    } catch (error) {
        console.error("Weather API Error:", error);
        throw error;
    }
};
