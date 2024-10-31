/**
 * 라우트 통합
 */
import express from 'express';
import naverRoutes from './naverRoutes.js';
import weatherRoutes from './weatherRoutes.js';

import { noCache } from './cacheControll.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Weather API server');
});

router.get('/kisangcheong-test', (req, res) => {
    res.send('Welcome to kisangcheong-test API server');
});
/**
// 기본 API 경로
router.use('/api/naver', noCache, naverRoutes);
router.use('/api/weather', noCache, weatherRoutes);

// kisangcheong-test에 대한 라우트
router.use('/kisangcheong-test/api/naver', noCache, naverRoutes);
router.use('/kisangcheong-test/api/weather', noCache, weatherRoutes);
 */

/**
 * 경로에 따라 path를 설정
 * @param {*} basePath 
 */
// 기본 API 경로와 kisangcheong-test에 대한 라우트를 설정하는 함수
const setupRoutes = (basePath) => {
    router.use(`${basePath}/api/naver`, noCache, naverRoutes);
    router.use(`${basePath}/api/weather`, noCache, weatherRoutes);
};

// 기본 경로에 대한 라우트 설정
// /weather-app/api/naver, /weather-app/api/weather
setupRoutes('/');

// kisangcheong-test 경로에 대한 라우트 설정
// /weather-app/kisangcheong-test/api/naver, /weather-app/kisangcheong-test/api/weather
setupRoutes('/kisangcheong-test');

// 각 경로에 대해 로그를 출력하는 미들웨어
// req는 요청 객체, res는 응답 객체, next는 다음 미들웨어 또는 라우트 핸들러로 제어를 넘기는 함수
router.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.originalUrl}`);
    next(); // 다음 미들웨어로 넘어갑니다.
})

export default router;