// CommonJS >> ES 모듈 변경
// const express = require('express');
// const fetch = require('node-fetch');
// const cors = require('cors');
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// .env 파일에서 환경 변수를 불러오기
// require('dotenv').config();
dotenv.config();

const app = express();
const PORT = 4000;

// CORS 설정 (필요에 따라 CLIENT_URL을 설정할 수 있음)
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));

// 루트 경로 핸들러
app.get('/', (req, res) => {
    res.send('Welcome to the Weather API server'); // 응답 추가
});

// /kisangcheong-test 경로 핸들러
app.get('/kisangcheong-test', (req, res) => {
    res.send('Welcome to kisangcheong-test'); // 응답 추가
});

// 공통 핸들러 함수: 네이버 API 호출
const naverApiHandler = async (req, res) => {
    try {
        const address = req.query.query;
        console.log(address);

        if (!address) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }
        
        const geoID = process.env.API_Naver_ID;
        const geoKey = process.env.API_Naver_Key;

        // API Key가 제대로 설정되어 있는지 확인
        if (!geoID || !geoKey) {
            return res.status(500).json({ error: 'Naver API keys are missing' });
        }

        const encodedAddress = encodeURIComponent(address);
        // console.log("address: ", address);

        const response = await fetch(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodedAddress}`, {
            headers: {
                'X-NCP-APIGW-API-KEY-ID': geoID,
                'X-NCP-APIGW-API-KEY': geoKey,
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch data from Naver API', response.status, response.statusText);
            return res.status(response.status).json({ error: 'Failed to fetch data from Naver API' });
        }

        const data = await response.json();
        // console.log("geoData: ", data);
        res.json(data);


    } catch (error) {
        console.error('Error in Naver API Handler:', error); // 오류 출력
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// 공통 핸들러 함수: 초단기 실황 날씨 API 호출
const weatherApiHandler = async (req, res) => {
    try {
        // console.log(req.query);

        const { base_date, base_time, nx, ny } = req.query;
        // 소수점 아래를 버리고 정수로 변환
        const truncatedNx = Math.trunc(nx);
        const truncatedNy = Math.trunc(ny);

        console.log(truncatedNx, truncatedNy);

        const apiKey = process.env.API_Kisangcheong;
        
        if (!base_date || !base_time || !truncatedNx || !truncatedNy) {
            return res.status(400).json({ error: 'Missing required query parameters' });
        }

        const response = await fetch(`http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${apiKey}&numOfRows=10&pageNo=1&base_date=${base_date}&base_time=${base_time}&nx=${truncatedNx}&ny=${truncatedNy}&dataType=JSON`);

         // 응답 상태가 정상인지 확인
        if (!response.ok) {
            console.error('Failed to fetch data from Naver API', response.status, response.statusText);
            return res.status(response.status).json({ error: 'Failed to fetch weather data' });
        }

        const data = await response.json();
        console.log("weather: ", data);
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// 루트 페이지 API 프록시 경로
app.get('/api/naver', naverApiHandler);
app.get('/api/weather', weatherApiHandler);

// 기상청 테스츠 페이지 API 프록시 경로
app.get('/kisangcheong-test/api/naver', naverApiHandler);
app.get('/kisangcheong-test/api/weather', weatherApiHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
