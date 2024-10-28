/**
 * 라우트 통합
 */
import express from 'express';
import naverRoutes from './naverRoutes.js';
import weatherRoutes from './weatherRoutes.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Weather API server');
});

router.get('/kisangcheong-test', (req, res) => {
    res.send('Welcome to kisangcheong-test');
});

// 기본 API 경로
router.use('/api/naver', naverRoutes);
router.use('/api/weather', weatherRoutes);

// kisangcheong-test에 대한 라우트
router.use('/kisangcheong-test/api/naver', naverRoutes);
router.use('/kisangcheong-test/api/weather', weatherRoutes);

export default router;