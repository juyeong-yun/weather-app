import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import { fetchGeoData, fetchWeatherData } from '../services/apiService';

import { convertToGrid } from '../utils/gridConverter';
import { getCurrentDateTime } from '../utils/dateUtil';
import { getPrecipitationType } from '../utils/weatherCode';

import '../css/main.css';
import '../reset.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLocationDot} from '@fortawesome/free-solid-svg-icons';
// import { response } from 'express';

const Main = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [geoData, setGeoData] = useState(null);
    const [address, setAddress] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [baseDate, setBaseDate] = useState("");
    const [baseTime, setBaseTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseName = process.env.REACT_APP_BASE_NAME || '/weather-app';
    
    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            setError(null);
            
            /**
             * 서버 연결
             * GitHub Pages는 이 파일을 직접 사용할 수 없음
             */
            
            const baseUrl = process.env.REACT_APP_BASE_URL  || 'http://localhost:4000';
            try{
                const [geoResponse, weatherResponse] = await Promise.all([
                    axios.get(`${baseUrl}${baseName}/api/naver`),
                    axios.get(`${baseUrl}${baseName}/api/weather`)
                ]);
                setGeoData(geoResponse.data);
                setWeatherData(weatherResponse.data);
            } catch (error){
                console.error("데이터 가져오는 중 오류 발생: ", error);
                setError("데이터 가져오는 중 오류 발생");
            } finally {
                setLoading(false);
            }
        }
        
        fetchData();
    }, []);
    
    const searchLocationWeather = useCallback( async () =>{
        if(!address) return;

        setLoading(true);
        setError(null);

        try {
            /**
             * 현재 페이지가 /kisangcheong-test 인지 확인
             * window.location: 현재 페이지의 URL 정보를 담고 있는 객체
             * .includes : 포함되면 true, 포함되지 않으면 false 반환
             */
            const isKisangcheongTest = window.location.pathname.replace(baseName, '').includes('kisangcheong-test');

            const geoData = await fetchGeoData(address, isKisangcheongTest);
            setGeoData(geoData);

            if (geoData.addresses && geoData.addresses.length > 0) {
                const { x, y } = geoData.addresses[0];

                const gridCoord = convertToGrid(parseFloat(y), parseFloat(x));

                const weatherData = await fetchWeatherData(baseDate, baseTime, gridCoord.nx, gridCoord.ny);
                console.log("weather: ", weatherData);
                setWeatherData(weatherData);
            } else {
                throw new Error('주소를 찾을 수 없습니다. 다른 주소를 입력해 주세요.');
            }

        } catch (error) {
            console.error("API 호출 실패", error);
            setError(error.message);
        
        } finally {
            setLoading(false);
        }
        
    } , [address, baseDate, baseTime]);

    useEffect(() => {
        const {baseDate: date, baseTime : time} = getCurrentDateTime();
        
        setBaseDate(date);
        setBaseTime(time);
    },[]);

    useEffect(() => {
        if(address) {
            searchLocationWeather();
        }
    },[address, searchLocationWeather]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setAddress(inputValue);
        setInputValue('');
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
        
        <div className='searchResult'>
            <div className='resultBox'>
                {weatherData && geoData && 
                    <div className='today'>
                        <div id='loc'>
                            <span><FontAwesomeIcon icon={faLocationDot} /> {geoData.addresses[0].roadAddress}</span>
                        </div>
                        {weatherData.response.body.items.item.map((item, index) => (
                            <div key={index}>
                                {item.category === "T1H" && (
                                        <div id='temp'>
                                            <span>현재 온도: {item.obsrValue}°C</span>
                                        </div>
                                    )}
                                    {item.category === "REH" && (
                                        <div id='reh'>
                                            <span>습도: {item.obsrValue}%</span>
                                        </div>
                                    )}
                                    {item.category === "PTY" && (
                                        <div id='pty'>
                                            <span>강수 형태: {getPrecipitationType(item.obsrValue)}</span>
                                        </div>
                                    )}
                            </div>
                        ))}
                        <div>

                        </div>
                    </div>
                }
                </div>
                <div className='tempByClothes'>
                    <div id='clothes'>
                        <span>온도에 맞는 옷차림은 아래와 같습니다.</span>
                    </div>
                </div>
        </div>
    </div>

    )
}

export default Main;