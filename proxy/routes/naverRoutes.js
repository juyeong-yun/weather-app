import express from 'express';
import { naverApiHandler } from '../controllers/naverController.js';

const router = express.Router();

router.get('/api/naver', naverApiHandler);
router.get('/kisangcheong-test/api/naver', naverApiHandler);

export default router;