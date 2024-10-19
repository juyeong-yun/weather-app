import React, { useState, useEffect, useCallback } from 'react';

import '../css/main.css';
import '../reset.css';

const KisangcheongTest = () => {
    const [address, setAddress] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
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
        const geo = `/api/naver?query=${address}`;

        try{
            const geoResp = await fetch(geo,{
                method: 'GET',
                headers: {

                    'Accept-Language' : 'ko',
                },
            });
            
            const geoData = await geoResp.json();
            
            if (geoData.addresses && geoData.addresses.length > 0) {
                // 첫 번째 주소 데이터 선택 (검색한 위치와 가장 가까운 곳을 반환)
                const addressData = geoData.addresses[0]; 
                console.log(addressData);

                const { x, y } = addressData;
                console.log(`x: ${x} y : ${y}`);

                const weatherUrl = `/api/weather/?base_date=${date}&base_time=${time}&nx=${x}&ny=${y}`;
                
                const weatherResp = await fetch(weatherUrl,{
                    method : 'GET',
                    headers: {
                        'Accept' : 'application/json',
                    },
                });

                const weatherData = await weatherResp.json();
                
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

    }, [address, date, time]);

    // 오늘 날짜, 다음날 날짜
    useEffect(() => {
        const currentDate = new Date();
        // console.log(currentDate); 
        // Tue Oct 15 2024 16:09:44 GMT+0900 (Korean Standard Time)

        // 오늘 날짜와 시간 계산
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
        const date = String(currentDate.getDate()).padStart(2, "0");
        const hours = String(currentDate.getHours()).padStart(2, "0");
        const minutes = String(currentDate.getMinutes()).padStart(2, "0");
        setDate(`${year}${month}${date}`);
        setTime(`${hours}${minutes}`);
        
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
            {weatherData && 

            /**
             * JSON.stringify()
             * weatherData가 존재할 경우(즉, null이 아니고 데이터가 있는 경우) 
             * 해당 데이터를 JSON 문자열로 변환하여 <div> 안에 표시합니다.
             */
                <div className='result'> {JSON.stringify(weatherData, null, 2)}
                </div>
                }
                <div className='note'>
                    <h3>노트</h3>
                    <ul>
                        <li>서버 중지 : ctrl + c</li>
                        <li>서버 다시 시작 : node server.js</li>
                    </ul>
                </div>
        </div>
    )
};

export default KisangcheongTest;