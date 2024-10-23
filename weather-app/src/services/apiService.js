// src/services/apiService.js

/**
 * geoCoding API
 * @param {*} address 
 * @returns 
 */
export const fetchGeoData = async (address, isKisangcheongTest) => {
    /**
     * encodeURIComponent() : URL 에서 안전하게 사용할 수 있도록 문자열을 인코딩 해준다.
     * 공백 %20
     */
    const geoUrl = isKisangcheongTest 
        ? `/kisangcheong-test/api/naver?query=${encodeURIComponent(address)}` 
        : `/api/naver?query=${encodeURIComponent(address)}`;
    
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
};

/**
 * 기상청 API
 * @param {*} baseDate 
 * @param {*} baseTime 
 * @param {*} nx 
 * @param {*} ny 
 * @returns 
 */
export const fetchWeatherData = async (baseDate, baseTime, nx, ny, isKisangcheongTest) => {
    const weatherUrl = isKisangcheongTest 
        ? `/kisangcheong-test/api/weather/?base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`
        : `/api/weather/?base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
    
    const response = await fetch(weatherUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    return response.json();
};
