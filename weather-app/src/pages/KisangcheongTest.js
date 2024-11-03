import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { fetchTestGeoData, fetchTestWeatherData } from '../services/apiServiceTest';

import { convertToGrid } from '../utils/gridConverter';
import { getCurrentDateTime } from '../utils/dateUtil';
import { getPrecipitationType } from '../utils/codeChanging';

import '../css/main.css';
import '../reset.css';

const KisangcheongTest = () => {
    const [weatherData, setWeatherData] = useState({});
    const [realTimeData, setRealTimeData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [geoData, setGeoData] = useState(null);
    const [address, setAddress] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [baseDate, setBaseDate] = useState("");
    const [baseTime, setBaseTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchKisangcheongData = useCallback(async() => {
        if (!address) return;

        setLoading(true);
        setError(null);
        
        try{ 
            const geoData = await fetchTestGeoData(address);
            setGeoData(geoData);
            // console.log("geoData: ", geoData);

            if (geoData.addresses && geoData.addresses.length > 0) {
                // 첫 번째 주소 데이터 선택 (검색한 위치와 가장 가까운 곳을 반환)
                const { x, y } = geoData.addresses[0];
                // console.log(`nx: ${x} ny : ${y}`);
                
                // 변환 함수 사용
                const gridCoord = convertToGrid(parseFloat(y), parseFloat(x));
                
                const { realTimeData:realTime, forecastData:forecast} = await fetchTestWeatherData(baseDate, baseTime, gridCoord.nx, gridCoord.ny);

                setRealTimeData(realTime); // 실시간 데이터 설정
                setForecastData(forecast); // 예보 데이터 설정

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

        // address가 비어 있지 않을 때만 fetchKisangcheongData 호출
        if(address) {
            fetchKisangcheongData();
        }

    },[address, fetchKisangcheongData]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
       // 입력 값이 비어 있지 않은 경우에만 주소를 설정
        if (inputValue.trim()) {
            setAddress(inputValue);
            setInputValue('');
        }
    };

    return (
        <div className="container">
            <div className='title'>
                <h3>kisangcheong test page </h3>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="searchRegion">
                    <div className='search'>
                        <input type="text" placeholder='원하는 장소를 검색해 주세요'
                        value={inputValue} onChange={(e) => setInputValue(e.target.value)}  />
                        <button type="submit">검색</button>
                    </div>
                </div>
            </form>
            {loading && <p>로딩 중...</p>}
            {error && <p>오류발생 : {error}</p>}
            <div className='result'>
                <h3>지역 : {geoData ? geoData.addresses[0].roadAddress : address}</h3>
                <div className='realTime'>
                    <div><span>단기 실황 기온 :</span>
                    {realTimeData && realTimeData.response && realTimeData.response.body ? 
                        (realTimeData.response.body.items.item.find(item => item.category === "T1H")?.obsrValue + '°C') : '정보 없음'}
                    </div>
                    <div><span>단기 실황 습도 :</span>
                        {realTimeData && realTimeData.response && realTimeData.response.body ? 
                            (realTimeData.response.body.items.item.find(item => item.category === "REH")?.obsrValue + '%') : '정보 없음'}
                    </div>
                    <div><span>단기 실황 강수 :</span> 
                        {realTimeData && realTimeData.response && realTimeData.response.body? 
                            (getPrecipitationType(realTimeData.response.body.items.item.find(item => item.category === "PTY")?.obsrValue)) : '정보 없음'}
                    </div>
                </div>
                <div className='forecast'>
                    <div><span>단기 예보 기온 :</span>
                        {forecastData && forecastData.response && forecastData.response.body ? 
                            (forecastData.response.body.items.item.find(item => item.category === "TMN")?.obsrValue + '°C') : '정보 없음'}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default KisangcheongTest;