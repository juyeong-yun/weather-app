// ../controllers/weatherController.js

/**
 * 기상청 날씨 가져오기
 */

import { getRealTimeData } from '../services/realTimeWeatherService.js';
import { getForecastData } from '../services/forecastWeatherService.js';
/** 
export const weatherApiHandler = async (req, res) => {
    try {
        const { base_date, base_time, nx, ny } = req.query;

        if (!base_date || !base_time || !nx || !ny) {
            return res.status(400).json({ error: 'Missing required query parameters' });
        }

        // 초단기 실황 데이터 가져오기
        const realTimeData = await getRealTimeData(base_date, base_time, nx, ny);
        // console.log("단기실황: ", realTimeData);
        
        // 단기 예보 데이터 가져오기
        const forecastData = await getForecastData(base_date, base_time, nx, ny);
        // console.log("단기예보: ", forecastData);

        // 데이터가 유효한지 확인 후 결합
        if (realTimeData && forecastData) {
            const responseData = {
                realTimeWeather: {...realTimeData},  // 키를 다르게 설정
                forecastWeather: {...forecastData}    // 키를 다르게 설정
            };

            console.log("apiHandler: ", responseData.realTimeWeather);
            console.log("apiHandler: ", responseData.forecastWeather);

            // 클라이언트에 응답 보내기
            res.json(responseData);  

        } else {
            // 데이터가 유효하지 않은 경우
            return res.status(500).json({ error: 'Invalid data received' });
        }

    } catch (error) {
        console.error('Error in Weather API Handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
*/

export const realTimeWeatherApiHandler = async(req, res) => {
    try {
        const { base_date, base_time, nx, ny } = req.query;

        if (!base_date || !base_time || !nx || !ny) {
            return res.status(400).json({ error: 'Missing required query parameters' });
        }

        // 초단기 실황 데이터 가져오기
        const realTimeData = await getRealTimeData(base_date, base_time, nx, ny);
        // console.log("단기실황: ", realTimeData);
        
        if (realTimeData) {
            res.json(realTimeData);

        } else {
            return res.status(500).json({ error: 'Invalid data received' });
        }
    } catch (error) {
        console.error('Error in Real Time Weather API Handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const forecastWeatherApiHandler = async(req, res) => {
    try {
        const { base_date, base_time, nx, ny } = req.query;
        console.log(req);

        if (!base_date || !base_time || !nx || !ny) {
            return res.status(400).json({ error: 'Missing required query parameters' });
        }

        // 초단기 실황 데이터 가져오기
        const forecastData = await getForecastData(base_date, base_time, nx, ny);
        // console.log("단기실황: ", forecastData);
        
        if (forecastData) {
            res.json(forecastData);
        } else {
            return res.status(500).json({ error: 'Invalid data received' });
        }
    } catch (error) {
        console.error('Error in Real Time Weather API Handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};