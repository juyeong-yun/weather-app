import React, {useEffect, useState, useCallback} from 'react';
import { fetchGeoData, fetchWeatherData } from '../services/apiService';

import { convertToGrid } from '../utils/gridConverter';
import { getCurrentDateTime } from '../utils/dateUtil';
import { getPrecipitationType } from '../utils/codeChanging';
import { getWeatherIcon } from '../utils/getIcons';

import '../css/main.css';
import '../reset.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLocationDot} from '@fortawesome/free-solid-svg-icons';
// import { response } from 'express';

const Main = () => {
    const [realTimeData, setRealTimeData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [geoData, setGeoData] = useState(null);
    const [address, setAddress] = useState('인천광역시 서구 가정동');
    const [inputValue, setInputValue] = useState('');
    const [baseDate, setBaseDate] = useState("");
    const [baseTime, setBaseTime] = useState("");
    const [error, setError] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState('../imges/sunny.png');
    const [minTemp, setMinTemp] = useState('');
    const [maxTemp, setMaxTemp] = useState('');

    const searchLocationWeather = useCallback( async () =>{
        if(!address) return;
        setError(null);

        try {
            const geoData = await fetchGeoData(address);
            setGeoData(geoData);
            // console.log(geoData);

            if (geoData.addresses && geoData.addresses.length > 0) {
                const { x, y } = geoData.addresses[0];
                // console.log(`nx: ${x} ny : ${y}`);
                
                const gridCoord = convertToGrid(parseFloat(y), parseFloat(x));

                const {realTimeData, forecastData} = await fetchWeatherData(baseDate, baseTime, gridCoord.nx, gridCoord.ny);
                // console.log("단기실황",realTimeData);
                console.log("단기예보",forecastData);
                
                setRealTimeData(realTimeData); // 실시간 데이터 설정
                setForecastData(forecastData); // 예보 데이터 설정

            } else {
                throw new Error('주소를 찾을 수 없습니다. 다른 주소를 입력해 주세요.');
            }
        } catch (error) {
            console.error("API 호출 실패", error);
            setError(error.message);
        
        } 
        
    } , [address, baseDate, baseTime]);

    useEffect(() => {
        const {baseDate: date, baseTime : time} = getCurrentDateTime();

        setBaseDate(date);
        setBaseTime(time);
        
        // 주소가 비어 있지 않으면 searchLocationWeather 호출
        if (address) {
            searchLocationWeather();
        }

    }, [address, searchLocationWeather]);

    // forecastData가 업데이트될 때마다 날씨 아이콘을 업데이트
    useEffect(() => {
        if (forecastData) {
            const fcstValue = forecastData.response.body.items.item.find(item => item.category === "SKY")?.fcstValue;
            if (fcstValue) {
                const icon = getWeatherIcon(fcstValue);
                setWeatherIcon(icon);
            }
        }

    }, [forecastData]);

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
        <form onSubmit={handleSubmit}>
            <div className="searchRegion">
                <div className='search'>
                    <input type="text" placeholder='원하는 장소를 검색해 주세요' 
                    value={inputValue} onChange={(value) => setInputValue(value.target.value)} />
                    <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </div>
            </div>
        </form>
        
        <div id='error'>
            {error && <h3>{error}</h3>}
        </div>

        <div className='searchResult'>
            <div className='resultBox'>
                <div className='today'>
                    <div id='temp'>
                        <div className='loc'>
                            <h3><FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '5px' }}/> 
                                {geoData ? geoData.addresses[0].roadAddress : address }
                            </h3>
                        </div>
                        <div className='t1h'>
                            <span className='weatherIcon'>
                                {forecastData && ( <img src= {weatherIcon} alt="" />)}
                            </span>
                            <span>
                            {realTimeData && realTimeData.response && realTimeData.response.body ? 
                                (realTimeData.response.body.items.item.find(item => item.category === "T1H")?.obsrValue + '°C') : '정보 없음'}
                            </span>
                            <div>
                                <span>최저
                                {forecastData && forecastData.response && forecastData.response.body ? 
                                    (forecastData.response.body.items.item.find(item => item.category === "SKY")?.fcstValue + '°C') : '정보 없음'}
                                </span>
                                <span>최고
                                {forecastData && forecastData.response && forecastData.response.body ? 
                                    (forecastData.response.body.items.item.find(item => item.category === "TMX")?.fcstValue + '°C') : '정보 없음'}
                                </span>
                            </div>
                            
                        </div>
                        
                    </div>
                    <div id='reh'>
                        <span>
                            {realTimeData && realTimeData.response && realTimeData.response.body ? 
                                (realTimeData.response.body.items.item.find(item => item.category === "REH")?.obsrValue + '%') : '정보 없음'}
                        </span>
                    </div>
                    <div id='pty'>
                        <span>
                            {realTimeData && realTimeData.response && realTimeData.response.body? 
                                (getPrecipitationType(realTimeData.response.body.items.item.find(item => item.category === "PTY")?.obsrValue)) : '정보 없음'}
                        </span>
                    </div>
                </div>
                
                </div>
                <div className='tempByClothes'>
                    <div id='clothes'>
                        <h3>온도에 맞는 옷차림은 아래와 같습니다.</h3>
                    </div>
                </div>
        </div>
    </div>

    )
}

export default Main;