// CommonJS >> ES 모듈 변경
// const express = require('express');
// const fetch = require('node-fetch');
// const cors = require('cors');
import process from 'process';
import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import routes from './routes/index.js';

const app = express();

// JSON 요청 본문을 파싱할 수 있도록 설정
app.use(express.json());

// CORS 설정 (필요에 따라 CLIENT_URL을 설정할 수 있음)
// 깃허브 서버 배포, 로컬
// 환경 변수를 사용한 CORS 설정
// const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:3000';
// app.use(cors({ origin: allowedOrigin }));

const corsOptions = {
    origin: ['http://localhost:3000', process.env.CLIENT_URL], // 허용할 출처
    methods: ['GET', 'POST'], // 허용할 HTTP 메서드
    credentials: true, // 자격 증명 허용
};

app.use(cors(corsOptions));

/**
 * basename이 포함된 전체 경로로 설정하여 /weather-app을 항상 앞에 추가
 */
app.use('/weather-app/api', routes);

// 기본 에러 핸들링
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});
