import express from 'express';
import { realTimeWeatherApiHandler,forecastWeatherApiHandler } from '../controllers/weatherController.js';

const router = express.Router();

router.get('/real-time', realTimeWeatherApiHandler); // 실시간 날씨
router.get('/forecast', forecastWeatherApiHandler); // 예보 데이터

/**
router.get('/', weatherApiHandler);
router.get('/kisangcheong-test', weatherApiHandler);

 * 
 */

export default router;