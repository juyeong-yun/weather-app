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
router.use('/api/weather', noCache, weatherRoutes);

// kisangcheong-test에 대한 라우트
router.use('/kisangcheong-test/api/naver', noCache, naverRoutes);
router.use('/kisangcheong-test/api/weather', noCache, weatherRoutes);

export default router;