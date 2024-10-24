// CommonJS >> ES 모듈 변경
// const express = require('express');
// const fetch = require('node-fetch');
// const cors = require('cors');
import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import routes from './routes/index.js';

const app = express();

// JSON 요청 본문을 파싱할 수 있도록 설정
app.use(express.json());

// CORS 설정 (필요에 따라 CLIENT_URL을 설정할 수 있음)
app.use(cors({ origin: config.clientUrl }));

app.use('/', routes);

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});
