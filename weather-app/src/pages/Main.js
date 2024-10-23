import React, {useEffect, useState, useCallback} from 'react';
import { fetchGeoData, fetchWeatherData } from '../services/apiService';

import { convertToGrid } from '../utils/gridConverter';
import { getCurrentDateTime } from '../utils/dateUtil';
import { getPrecipitationType } from '../utils/weatherCode';

import '../css/main.css';
import '../reset.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Main = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [geoData, setGeoData] = useState(null);
    const [address, setAddress] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [baseDate, setBaseDate] = useState("");
    const [baseTime, setBaseTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
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
            const isKisangcheongTest = window.location.pathname.includes('kisangcheong-test');

            const geoData = await fetchGeoData(address, isKisangcheongTest);
            setGeoData(geoData);

            if (geoData.addresses && geoData.addresses.length > 0) {
                const { x, y } = geoData.addresses[0];

                const gridCoord = convertToGrid(parseFloat(y), parseFloat(x));

                const weatherData = await fetchWeatherData(baseDate, baseTime, gridCoord.nx, gridCoord.ny);
                // console.log("weather: ", weatherData);
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
                            <span></span>
                            <span>가정동</span>
                        </div>
                        <div id='temp'>
                            <span></span>
                        </div>
                        <div id='maxTemp'>
                            <span>최고:</span>
                        </div>
                        <div id='minTemp'>
                            <span>최저:</span>
                        </div>
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