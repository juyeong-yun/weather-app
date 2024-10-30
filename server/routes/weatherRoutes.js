import express from 'express';
import { weatherApiHandler } from '../controllers/weatherController.js';

const router = express.Router();

router.get('/', weatherApiHandler);
router.get('/kisangcheong-test', weatherApiHandler);

export default router;