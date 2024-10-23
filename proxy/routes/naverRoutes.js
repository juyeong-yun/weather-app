// routes/naverRoutes.js

/**
 * naver api 호출
 */
import express from 'express';
import { naverApiHandler } from '../controllers/naverController.js';

const router = express.Router();

router.get('/', naverApiHandler);
router.get('/kisangcheong-test', naverApiHandler);

export default router;