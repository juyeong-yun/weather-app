import React, { useState, useEffect, useCallback } from 'react';
import { fetchGeoData, fetchWeatherData } from '../services/apiService';

import { convertToGrid } from '../utils/gridConverter';
import { getCurrentDateTime } from '../utils/dateUtil';
import { getPrecipitationType } from '../utils/weatherCode';

import '../css/main.css';
import '../reset.css';

const KisangcheongTest = () => {
    const [address, setAddress] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [geoData, setGeoData] = useState(null);
    const [baseDate, setBaseDate] = useState("");
    const [baseTime, setBaseTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchKisangcheongData = useCallback(async() => {
        if (!address) return;

        setLoading(true);
        setError(null);
        
        try{ 
            const isKisangcheongTest = window.location.pathname.includes('kisangcheong-test');
            
            const geoData = await fetchGeoData(address, isKisangcheongTest);
            setGeoData(geoData);

            setGeoData(geoData); // geoData 상태 설정
            // console.log("geoData: ", geoData);

            if (geoData.addresses && geoData.addresses.length > 0) {
                // 첫 번째 주소 데이터 선택 (검색한 위치와 가장 가까운 곳을 반환)
                const { x, y } = geoData.addresses[0];
                // console.log(`nx: ${x} ny : ${y}`);
                
                // 변환 함수 사용
                const gridCoord = convertToGrid(parseFloat(y), parseFloat(x));
                
                const weatherData = await fetchWeatherData(baseDate, baseTime, gridCoord.nx, gridCoord.ny);
                setWeatherData(weatherData);

            } else {
                throw new Error('주소를 찾을 수 없습니다. 다른 주소를 입력해 주세요.');
            }
    }catch(error) {
        console.error("API 호출 실패", error);
        setError(error.message);
    }finally{
        setLoading(false);
    }

    }, [address, baseDate, baseTime]);

    // 구하는 날짜와 시간 계산 (초단기 실황에 맞춤)
    useEffect(() => {
        const {baseDate: date, baseTime : time} = getCurrentDateTime();
        
        setBaseDate(date);
        setBaseTime(time);
    },[]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        setAddress(inputValue);
        setInputValue('');
    };

    useEffect(() => {
        if(address) {
            fetchKisangcheongData();
        }
    },[address, fetchKisangcheongData]);

    return (
        <div className="container">
            <div className='title'>
                <h3>kisangcheong test page </h3>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="searchRegion">
                    <div className='search'>
                        <h3>어느 지역의 날씨를 알고 싶나요? </h3>
                        <input type="text" value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}  />
                        <button type="submit">검색</button>
                    </div>
                </div>
            </form>
            {loading && <p>로딩 중...</p>}
            {error && <p>오류발생 : {error}</p>}
            {weatherData && geoData && 

            /**
             * JSON.stringify()
             * weatherData가 존재할 경우(즉, null이 아니고 데이터가 있는 경우) 
             * 해당 데이터를 JSON 문자열로 변환하여 <div> 안에 표시합니다.
             */
                <div className='result'>
                    <h3>지역 : {geoData.addresses[0].roadAddress}</h3>
                    <h3>{weatherData.response.body.items.item[0].baseDate} {weatherData.response.body.items.item[0].baseTime}</h3>
                {weatherData.response.body.items.item.map((item, index) => (
                    // key : 배열의 각 요소를 고유하게 식별하는 데 사용
                    <div key={index}>
                        {item.category === "T1H" && (
                            <p>온도: {item.obsrValue}°C</p>
                        )}
                        {item.category === "PTY" && (
                            <p>강수 형태: {getPrecipitationType(item.obsrValue)}</p>
                        )}
                        {item.category === "REH" && (
                            <p>습도: {item.obsrValue}%</p>
                        )}
                    </div>
                ))}
                </div>
                }
                <div className='note'>
                    <h3>노트</h3>
                    <ul>
                        <li> const 와 let 의 차이
                            <ol>
                                <li>- const는 값을 변경할 수 없는 상수를 선언하는 데 사용</li>
                                <li>- let은 값을 재할당할 수 있는 변수를 선언할 때 사용</li>
                            </ol>
                        </li>
                        <li>오늘 날짜 불러오기 <br /> 
                        new Date(); - Tue Oct 15 2024 16:09:44 GMT+0900 (Korean Standard Time)
                        </li>
                        <li>encodeURIComponent() : URL 에서 안전하게 사용할 수 있도록 문자열을 인코딩 해준다.</li>
                        <li>서버 중지 : ctrl + c</li>
                        <li>서버 다시 시작 : node server.js</li>
                    </ul>
                </div>
        </div>
    )
};

export default KisangcheongTest;