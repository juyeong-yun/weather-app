import React, { useState, useEffect, useCallback } from 'react';

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
        
        /**
         * encodeURIComponent()
         * URL 에서 안전하게 사용할 수 있도록 문자열을 인코딩 해준다.
         * 공백 %20
         */
        // 네이버맵 geocoding 
        const geo = `/kisangcheong-test/api/naver?query=${address}`;

        try{
            const geoResp = await fetch(geo,{
                method: 'GET',
                headers: {
                    'Accept' : 'application/json',
                    'Accept-Language' : 'ko',
                },
            });
            
            const geoData = await geoResp.json();
            setGeoData(geoData); // geoData 상태 설정
            // console.log("geoData: ", geoData);

            if (geoData.addresses && geoData.addresses.length > 0) {
                // 첫 번째 주소 데이터 선택 (검색한 위치와 가장 가까운 곳을 반환)
                const { x, y } = geoData.addresses[0];
                // console.log(`nx: ${x} ny : ${y}`);

                const weatherUrl = `/kisangcheong-test/api/weather/?base_date=${baseDate}&base_time=${baseTime}&nx=${x}&ny=${y}`;
                
                const weatherResp = await fetch(weatherUrl,{
                    method : 'GET',
                    headers: {
                        'Accept' : 'application/json',
                    },
                });

                const weatherData = await weatherResp.json();
                console.log("weatherData: ", weatherData);

            if (weatherResp.ok) {
                setWeatherData(weatherData);
                console.log(weatherData);
            } else {
                throw new Error('날씨 데이터를 불러오는 중 오류가 발생했습니다.');
            }

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

    // 오늘 날짜와 시간 계산 (초단기 실황에 맞춤)
    useEffect(() => {
        const currentDate = new Date();
        // console.log(currentDate); 

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
        const date = String(currentDate.getDate()).padStart(2, "0");
        
        let hours = String(currentDate.getHours()).padStart(2, "0");
        
        // 자정에는 전 날짜로, 아니라면 한 시간씩 뒤로
        if (hours === 0) {
            hours = 23;
            currentDate.setDate(currentDate.getDate()-1);
        } else {
            hours -= 1;
        }
        const baseTime = String(hours).padStart(2,"0") + "00";
        
        setBaseDate(`${year}${month}${date}`);
        setBaseTime(baseTime);

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
                            <p>강수 형태: {item.obsrValue === "0" ? "없음" : "비 또는 눈"}</p>
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
                        new Date(); - Tue Oct 15 2024 16:09:44 GMT+0900 (Korean Standard Time)</li>
                        <li>서버 중지 : ctrl + c</li>
                        <li>서버 다시 시작 : node server.js</li>
                    </ul>
                </div>
        </div>
    )
};

export default KisangcheongTest;