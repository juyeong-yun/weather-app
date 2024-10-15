import React, {useEffect, useState} from 'react';

import '../css/main.css';
import '../reset.css';

const Main = () => {
    const [forecastData, setForecastData] = useState(null);
    const [region, setRegion] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = process.env.REACT_APP_API_KEY;
    
    const fetchForecastData = async () =>{
        if(!region) return;

        setLoading(true);
        setError(null);

        // 위도, 경도 가져오는 Geoapi
        const geo = `http://api.openweathermap.org/geo/1.0/direct?q=${region}&limit=1&appid=${apiKey}`;

        const geoResp = await fetch(geo);
        const geoData = await geoResp.json();

    };

    const handleSubmit = (value) => {
        value.preventDefault();

        setRegion(value);
        setInputValue('');
    };

    return (
    <div className="container">
        <form onSubmit={handleSubmit}>
            <div className="searchRegion">
                <div className='search'>
                    <h3>원하는 지역을 검색해 주세요 : </h3>
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