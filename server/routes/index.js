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

// 기본 API 경로
router.use('/api/naver', noCache, naverRoutes);
// 메인 페이지의 기상청 API 연결 : 초단기 실황 및 단기예보
router.use('/api/weather', noCache, weatherRoutes);

// kisangcheong-test에 대한 라우트
router.use('/kisangcheong-test/api/naver', noCache, naverRoutes);
// 기상청 테스트 페이지를 위한 별도의 API 연결
router.use('/kisangcheong-test/api/weather', noCache, weatherRoutes);


export default router;