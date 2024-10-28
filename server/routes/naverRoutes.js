// routes/naverRoutes.js

/**
 * naver api 호출
 */
import express from 'express';
import { naverApiHandler } from '../controllers/naverController.js';

const router = express.Router();

router.get('/naver', (req, res) => {
    const query = req.query.query; // 쿼리 파라미터 가져오기
    // Naver API와의 통신 로직 작성
    res.json({ message: `Naver query: ${query}` });
});

router.get('/', naverApiHandler);
router.get('/kisangcheong-test', naverApiHandler);

export default router;