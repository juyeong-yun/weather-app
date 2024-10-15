import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../css/main.css';
import '../reset.css';

const KisangcheongTest = () => {
    const [region, setRegion] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [weatherData, setWeatherData] = useState('');
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [Error, setError] = useState(null);

    const apiKey = process.env.REACT_APP_API_Kisangcheong;
    // console.log(apiKey);

    const fetchKisangcheongData = async() => {
        if (!region) return;

        setLoading(true);
        setError(null);

        const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${apiKey}&numOfRows=10&pageNo=1&base_date=${date}&base_time=${time}&nx=${lat}&ny=${lon}`;
        
        try{
            const resp = await fetch(url);
            const data = await resp.json();
            
            console.log(data);
            
            if(data.cod === '200') {
                setWeatherData(data);
            } else{
                throw new Error(data.message);
            }
        }catch {

        }finally{

        }

    };

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

        setTm1(`${year}${month}${date}${hours}${minutes}`);

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

        setTm2(`${nextYear}${nextMonth}${nextDay}${nextHours}${nextMinutes}`);

    },[]);
    
    const handleSubmit = (value) => {
        value.preventDefault();
        
        setRegion(inputValue);
        setInputValue('');
    };

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