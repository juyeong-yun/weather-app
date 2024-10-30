import express from 'express';
import { weatherApiHandler } from '../controllers/weatherController.js';

const router = express.Router();

// router.get('/', weatherApiHandler);
// router.get('/kisangcheong-test', weatherApiHandler);

router.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store'); // 캐시 비활성화 설정
    res.send("Weather API data"); // 실제 응답 데이터로 변경하세요.
    // 여기에 네이버 API 호출 및 응답 처리 코드 작성
    weatherApiHandler(req, res); // weatherApiHandler 호출
});

router.get('/kisangcheong-test', (req, res) => {
    res.set('Cache-Control', 'no-store'); // 캐시 비활성화 설정
    res.send("Weather API data"); // 실제 응답 데이터로 변경하세요.
    // 여기에 네이버 API 호출 및 응답 처리 코드 작성
    weatherApiHandler(req, res); // weatherApiHandler 호출
});

export default router;