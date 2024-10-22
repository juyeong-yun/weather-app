import express from 'express';
import { weatherApiHandler } from '../controllers/weatherController.js';

const router = express.Router();

router.get('/api/weather', weatherApiHandler);
router.get('/kisangcheong-test/api/weather', weatherApiHandler);

export default router;