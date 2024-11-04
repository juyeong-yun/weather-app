// src/services/apiService.js
import { getNearestBaseTime } from '../utils/dateUtil';
/**
 * geoCoding API
 * @param {*} address 
 * @returns 
 */
export const fetchGeoData = async (address) => {
    const baseName = process.env.REACT_APP_BASE_NAME || '/weather-app';
    
    if (address) {
        const geoUrl = `${baseName}/api/naver?query=${encodeURIComponent(address)}`;
        // console.log("geo url: ", geoUrl);

        const response = await fetch(geoUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Language': 'ko',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch geocoding data');
        }
    
        return response.json();
    }
    
};

/**
 * 기상청 API
 * @param {*} baseDate 
 * @param {*} baseTime 
 * @param {*} nx 
 * @param {*} ny 
 * @returns 
 */
export const fetchWeatherData = async (baseDate, baseTime, nx, ny) => {
    const baseName = process.env.REACT_APP_BASE_NAME || '/weather-app';
    const baseTimeFore = getNearestBaseTime(baseTime);
    
    if (baseDate && baseTime && nx && ny){
        // 초단기 실황
        const realTimeUrl = `${baseName}/api/weather/real-time?base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
        // 단기 예보
        const forecastUrl = `${baseName}/api/weather/forecast?base_date=${baseDate}&base_time=${baseTimeFore}&nx=${nx}&ny=${ny}`;
        // console.log(forecastUrl);

        try {
            // 단기 실황, 단기 예보 호출
            const [realTimeResponse, forecastResponse] = await Promise.all([
                fetch(realTimeUrl, {
                    headers: { 'Accept': 'application/json' }
                }),
                fetch(forecastUrl, {
                    headers: { 'Accept': 'application/json' }
                })
            ]);
            // console.log("real ",realTimeResponse.status);
            // console.log("fore ", forecastResponse.status);

            // 각 응답이 JSON 형식인지 확인하고 실제 JSON 데이터를 가져옴
            if (!realTimeResponse.ok || !forecastResponse.ok) {
                throw new Error('Network response was not ok');
            }

            // `data`를 사용하여 실제 JSON 데이터를 가져옴
            return { 
                realTimeData : await realTimeResponse.json(),
                forecastData : await forecastResponse.json()
            };
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error; // 에러를 다시 던져 호출하는 곳에서 처리할 수 있도록 함
        }
    }
};
