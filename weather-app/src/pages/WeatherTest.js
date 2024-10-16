import React, { useEffect, useState, useCallback } from 'react';

import '../css/main.css';
import '../reset.css';

const WeatherTest = () => {
    const [weatherData, setWeatherData] = useState(null); // 날씨 데이터 저장
    const [region, setRegion] = useState(''); // 사용자가 입력한 지역
    const [inputValue, setInputValue] = useState(''); // 입력 필드의 상태
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState(null); // 오류 상태

    // 환경 변수로 저장한 API 키 호출
    const apiKey = process.env.REACT_APP_API_OpenWeather;
    // console.log("apiKey: ", apiKey);

    // fetchWeatherData 함수를 useCallback으로 래핑
    const fetchWeatherData = useCallback(async () => {
        if (!region) return; // 입력된 지역이 없으면 호출하지 않음

        setLoading(true);
        setError(null);

        // URL 설정
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${region}&appid=${apiKey}&units=metric&lang=kr`;

        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error('API 호출 실패');
            }
            const data = await resp.json();
            // console.log(data);

            // 날씨 데이터 상태 저장
            setWeatherData(data);
        } catch (error) {
            console.error("API 호출 실패", error);
            setError(error.message); // 오류 메시지 설정
        } finally {
            setLoading(false);
        }
    }, [region, apiKey]); // region과 apiKey를 의존성으로 추가

    // region이 변경될 때마다 fetchWeatherData 호출
    useEffect(() => {
        if (region) {
            fetchWeatherData();
        }
    }, [region, fetchWeatherData]); // fetchWeatherData를 의존성으로 추가

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setRegion(inputValue); // 입력된 값으로 지역 업데이트
        setInputValue('');
        fetchWeatherData(); // 날씨 데이터 요청
    };

    return (
        <div className="container">
            <div className='title'>
                <h3>weather test page</h3>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="searchRegion">
                    <div className='search'>
                        <h3>원하는 지역을 검색해 주세요 : </h3>
                        <input type="text" value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)} />
                        <button type="submit">검색</button>
                    </div>
                </div>
            </form>

            {loading ? (
                <p>로딩 중...</p>
            ) : error ? (
                <p>{error}</p> // 오류 메시지 표시
            ) : (
                weatherData && (
                    <div className='result'>
                        <h4>{weatherData.name} 날씨</h4>
                        <p>온도: {weatherData.main.temp}°C</p>
                        <p>상태: {weatherData.weather[0].description}</p>
                        <p>최고 온도: {weatherData.main.temp_max}°C</p>
                        <p>최저 온도: {weatherData.main.temp_min}°C</p>
                        <p>체감 온도: {weatherData.main.feels_like}°C</p>
                        <p>습도: {weatherData.main.humidity}%</p>
                        <p>일출: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
                        <p>일몰: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
                    </div>
                )
            )}
            
            <div className='note'>
                <h3>노트</h3>
                <ul>
                    <li>useCallback : React의 Hook 중 하나<br /><br />
                    컴포넌트가 랜더링 될 때마다 새로운 함수를 생성하는 것을 방지하여, 자식 컴포넌트의 불필요한 랜더링을 줄인다.
                    </li>
                    <li>useEffect : React의 Hook 중 하나<br /><br />
                    컴포너트의 생명주기 동안 특정 작업을 수행할 수 있게 해준다. 컴포넌트가 랜더링 될 때마다 실행된다.
                        <ol>
                            <li> 함수 function : 실행 함수. 컴포넌트가 렌더링될 때 실행된다.
                            </li>
                            <li> 의존성 dependency : 선택 사항 <br /><br />
                                이 인자가 있으면, 그 값이 변경될 때마다 useEffect의 함수가 다시 실행되며, 비어 있으면 컴포넌트가 처음 렌더링될 때 한 번만 실행된다.</li>
                        </ol>
                    </li>
                    <li>useState : React의 Hook 중 하나<br /><br />
                    컴포넌트 내에서 상태를 관리하는데 사용. UI를 동적으로 업데이트 하는데 사용된다.
                    </li>
                    <li>await : javascript 키워드<br /><br />
                        async 로 정의된 함수 내에서만 사용할 수 있으며, 비동기 작업(API 호출, 파일 읽기 등) 동기적으로 처리하는 것 처럼 작성할 수 있게 한다.
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default WeatherTest;