import React, {useEffect, useState} from 'react'

import '../css/main.css';
import '../reset.css';

const ForecastTest = () => {
    const [weatherData, setWeatherData] = useState(null); // 현재 날씨 데이터 저장
    const [forecastData, setForecastData] = useState(null); // 미래 날씨 데이터 저장
    const [region, setRegion] = useState(''); // 사용자가 입력한 지역

    const [loading, setLoading] = useState(false); // 로딩 상태

    // 환경 변수로 저장한 API 키 호출
    const apiKey = process.env.REACT_APP_API_KEY;

    const fetchCoordinatesData = async () => {
        
        // 입력된 지역이 없으면 호출하지 않음
        if (!region) return;

        setLoading(true);
        // url 설정
        const url =`https://api.openweathermap.org/data/2.5/forecast?q=${region}&appid=${apiKey}`;
            
        try{
            const resp = await fetch(url);
            const data = await resp.json();
            
            // cod Internal parameter
            if(data.cod === 200) {
                return{
                    lat: data.coord.lat,
                    lon: data.coord.lon,
                };
            } else{
                throw new Error(data.message);
            }
            // 날씨 데이터 상태 저장
            setWeatherData(data);

        } catch(error){
            console.error("API 호출 실패", error);

        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setLoading(true);
        setForecastData();
    };

    return(
        <div className="container">
            <h3> forecast test page </h3>
            <form onSubmit={handleSubmit}>
                <div className="searchRegion">
                    <h3>원하는 지역을 검색해 주세요 : </h3>
                    <input type="text" value={region}
                    onChange={(e) => setRegion(e.target.value)} // 입력값을 상태로 업데이트
                    />
                    <button type="submit">검색</button>
                </div>
            </form>
            {loading ? (
                <p>로딩 중...</p>
            ) : (
                weatherData && (
                <div>
                    <h4>{weatherData.name}</h4>
                    <p>온도: {weatherData.main.temp}°C</p>
                    <p>상태: {weatherData.weather[0].description}</p>
                </div>
                )
            )}
        </div>

    )

}

export default ForecastTest;