import React, {useEffect, useState, useCallback} from 'react';
import { fetchGeoData, fetchWeatherData } from '../services/apiService';

import { convertToGrid } from '../utils/gridConverter';
import { getCurrentDateTime, getNexDateTime } from '../utils/dateUtil';
import { getPrecipitationType } from '../utils/weatherCode';

import '../css/main.css';
import '../reset.css';

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
            geoData = await fetchGeoData(address);
            setGeoData(geoData);

            if (geoData.addresses && geoData.addresses.length > 0) {
                const { x, y } = geoData.addresses[0];

                const gridCoord = convertToGrid(parseFloat(y), parseFloat(x));

                const weatherData = await fetchWeatherData(baseDate, baseTime, gridCoord.nx, gridCoord.ny);
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

        const {baseDate: next_date, baseTime : next_time} = getNexDateTime();
        
    },[]);

    useEffect(() => {
        if(address) {
            searchLocationWeather();
        }
    },[address, searchLocationWeather]);

    const handleSubmit = (value) => {
        value.preventDefault();

        setAddress(value);
        setInputValue('');
    };

    return (
    <div className="container">
        <form onSubmit={handleSubmit}>
            <div className="searchRegion">
                <div className='search'>
                    <h3>어디를 검색할까요? : </h3>
                    <input type="text" value={inputValue} onChange={(value) => setInputValue(value.target.value)} />
                    <button type="submit">검색</button>
                </div>
            </div>
        </form>
        
        <div className='searchResult'>
            <div className='resultBox'>
                <div className='today'>
                    <div className='todayTemp'>
                        <span id='name'>지역:</span>
                        <span id='nowTemp'>기온:</span>
                        <span id='maxTemp'>최고:</span>
                        <span id='minTemp'>최저:</span>
                    </div>
                </div>
                <div className='tomorrow'></div>
            </div>
            <div className='tempByClothes'>
                <div id='temp'>
                    <span>기온</span>
                </div>
                <div id='clothes'>

                </div>
            </div>
        </div>
    </div>

    )
}

export default Main;