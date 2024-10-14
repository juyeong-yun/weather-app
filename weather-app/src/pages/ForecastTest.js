import React, {useCallback, useEffect, useState} from 'react'

import '../css/main.css';
import '../reset.css';

const ForecastTest = () => {
    const [forecastData, setForecastData] = useState(null); // 미래 날씨 데이터 저장
    const [region, setRegion] = useState(''); // 사용자가 입력한 지역
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 환경 변수로 저장한 API 키 호출
    const apiKey = process.env.REACT_APP_API_KEY;

    const fetchForecastData = useCallback(async () => {
        // 입력된 지역이 없으면 호출하지 않음
        if (!region) return;
        
        setLoading(true);
        setError(true);

        // 위도, 경도 가져오는 Geoapi
        const geo = `http://api.openweathermap.org/geo/1.0/direct?q=${region}&limit=1&appid=${apiKey}`;

        try{
            const geoResp = await fetch(geo);
            const geoData = await geoResp.json();

            if(geoData.length > 0) {
                
                // 첫 번째 결과에서 위도와 경도 추출
                const {lat, lon} = geoData[0];
                // console.log(`lat: ${lat}, lon : ${lon}`);
                
                const url =`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr&cnt=5`;
                const resp = await fetch(url);
                const data = await resp.json();

                if(data.cod === '200') {
                    setForecastData(data);
                    console.log("forecastData: ", data);
                } else{
                    throw new Error(data.message);
                }
            } else {
                throw new Error("지역을 찾을 수 없습니다.");
            }

        } catch(error){
            console.error("API 호출 실패", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        setRegion(inputValue);
        setInputValue('');
    };

    useEffect(() => {
        if(region) {
            fetchForecastData();
        }
    }, [region, apiKey]);

    return(
        <div className="container">
            <div className='title'>
                <h3>forecast test page </h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="searchRegion">
                    <div className='search'>
                        <h3>원하는 지역을 검색해 주세요 : </h3>
                        <input type="text" value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}  />
                        <button type="submit">검색</button>
                    </div>
                </div>
            </form>

            {loading ? (
                <p>로딩 중...</p>
            ) : (
                forecastData && (
                    <div className='result'>
                        <h4>{forecastData.city.name} 날씨</h4>
                        {forecastData.list.map((item) => (
                            <div key={item.dt}>
                                <p>날짜: {item.dt_txt}</p>
                                <p>온도: {item.main.temp}°C</p>
                                <p>상태: {item.weather[0].description}</p>
                                <p>체감 온도: {item.main.feels_like}°C</p>
                                <p>최고 온도: {item.main.temp_max}°C</p>
                                <p>최저 온도: {item.main.temp_min}°C</p>
                                <p>습도: {item.main.humidity}%</p>
                                <p>일출: {new Date(forecastData.city.sunrise * 1000).toLocaleTimeString()}</p>
                                <p>일몰: {new Date(forecastData.city.sunset * 1000).toLocaleTimeString()}</p>
                                <p>----------------------</p>
                            </div>
                        ))}

                        <div className='note'>
                            <h3>신경 쓸 점</h3>
                            <ul>
                                <li>1. 당일에 가장 가까운 시간대</li>
                                <li>2. 다음날은? 어떻게 표기하는 걸까?</li>
                            </ul>
                        </div>
                    </div>
                )
            )}

            
        </div>

    )

}

export default ForecastTest;