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
app.use(cors({ origin: config.clientUrl || 'http://localhost:3000' }));

app.use('/api', routes);

// 기본 에러 핸들링
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});
