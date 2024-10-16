import React, { useState, useEffect, useCallback } from 'react';

import '../css/main.css';
import '../reset.css';

const KisangcheongTest = () => {
    const [address, setAdress] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [weatherData, setWeatherData] = useState('');
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [Error, setError] = useState(null);

    // 날씨
    const apiKey = process.env.REACT_APP_API_Kisangcheong;
    // 좌표
    const geoID = process.env.REACT_APP_API_Naver_ID;
    const geoKey = process.env.REACT_APP_API_Naver_Key;

    const fetchKisangcheongData = useCallback(async() => {
        if (!address) return;

        setLoading(true);
        setError(null);
        
        // 네이버맵 geocoding 
        const geo = `/map-geocode/v2/geocode?query=${address}`;

        try{
            const geoResp = await fetch(geo, {
                method: 'GET',
                headers : {
                    'X-NCP-APIGW-API-KEY-ID': geoID,
                    'X-NCP-APIGW-API-KEY': geoKey,
                    'Accept': 'application/json',
                },
            });
            const geoData = await geoResp.json();
            console.log(geoData.origin);
            
            if(geoData.adress.length > 0){

                const weatherUrl = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${apiKey}&numOfRows=10&pageNo=1&base_date=${date}&base_time=${time}&nx={lat}&ny={lon}`;
            const weatherResp = await fetch(weatherUrl);
            const weatherData = await weatherResp.json();
            
            if (weatherResp.ok) {
                setWeatherData(weatherData);
            } else {
                throw new Error('날씨 데이터를 불러오는 중 오류가 발생했습니다.');
            }
        } else {
            throw new Error('좌표 데이터를 불러오는 중 오류가 발생했습니다.');
        }
    }catch(error) {
        console.error("API 호출 실패", error);
        setError(error.message);
    }finally{
        setLoading(false);
    }

    }, [address, date, time, apiKey, geoID, geoKey]);

    // 오늘 날짜, 다음날 날짜
    useEffect(() => {
        const currentDate = new Date();
        // console.log(currentDate); Tue Oct 15 2024 16:09:44 GMT+0900 (Korean Standard Time)

        // 오늘 날짜와 시간 계산
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
        const date = String(currentDate.getDate()).padStart(2, "0");
        const hours = String(currentDate.getHours()).padStart(2, "0");
        const minutes = String(currentDate.getMinutes()).padStart(2, "0");

        
        // 내일 날짜와 시간 계산 (currentDate에 1일을 더함)
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 1);
        // console.log(nextDate); Wed Oct 16 2024 16:57:51 GMT+0900 (Korean Standard Time)
        /**
         * currentDate 객체를 복사하는 코드
         * currentDate 값을 이용하여 같은 시간을 가진 새로운 Date 객체를 생성
         */
        
        const nextYear = nextDate.getFullYear();
        const nextMonth = String(nextDate.getMonth() + 1).padStart(2, "0");
        const nextDay = String(nextDate.getDate()).padStart(2, "0");
        const nextHours = String(nextDate.getHours()).padStart(2, "0");
        const nextMinutes = String(nextDate.getMinutes()).padStart(2, "0");

        
    },[]);
    
    const handleSubmit = (value) => {
        value.preventDefault();
        
        setAdress(inputValue);
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
                        <h3>원하는 지역을 검색해 주세요 : </h3>
                        <input type="text" value={inputValue}
                        onChange={(value) => setInputValue(value.target.value)}  />
                        <button type="submit">검색</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default KisangcheongTest;