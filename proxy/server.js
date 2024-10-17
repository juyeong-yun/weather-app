// CommonJS >> ES 모듈 변경
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

// import express from 'express';
// import cors from 'cors';
// import fetch from 'node-fetch';
// import dotenv from 'dotenv';

// .env 파일에서 환경 변수를 불러오기
require('dotenv').config();

const app = express();
const PORT = 4000;

// 모든 출처에서 오는 요청을 허용
app.use(cors({ origin: '*' }));

// 네이버 API 프록시
app.get('/api/naver', async (req, res) => {
    const address = req.query.query;
    const geoID = process.env.API_Naver_ID;
    const geoKey = process.env.API_Naver_KEY;

    const response = await fetch(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${address}`, {
        headers: {
            'X-NCP-APIGW-API-KEY-ID': geoID,
            'X-NCP-APIGW-API-KEY': geoKey,
        },
    });

    const data = await response.json();
    res.json(data);
});

// 날씨 API 프록시
app.get('/api/weather', async (req, res) => {
    const { base_date, base_time, nx, ny } = req.query;
    const apiKey = process.env.API_Kisangcheong;

    const response = await fetch(`http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${apiKey}&numOfRows=10&pageNo=1&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`);
    
    const data = await response.json();
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
