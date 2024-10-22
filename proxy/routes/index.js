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

router.use(naverRoutes);
router.use(weatherRoutes);

export default router;