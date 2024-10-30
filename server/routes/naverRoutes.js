// routes/naverRoutes.js

/**
 * naver api 호출
 */
import express from 'express';
import { naverApiHandler } from '../controllers/naverController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store'); // 캐시 비활성화 설정
    res.send("Naver API data"); // 실제 응답 데이터로 변경하세요.
    // 여기에 네이버 API 호출 및 응답 처리 코드 작성
    naverApiHandler(req, res); // naverApiHandler 호출
});

router.get('/kisangcheong-test', (req, res) => {
    res.set('Cache-Control', 'no-store'); // 캐시 비활성화 설정
    res.send("Naver API data"); // 실제 응답 데이터로 변경하세요.
    // 여기에 네이버 API 호출 및 응답 처리 코드 작성
    naverApiHandler(req, res); // naverApiHandler 호출
});


export default router;