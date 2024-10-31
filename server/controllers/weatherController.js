// ../controllers/weatherController.js
/**
 * 기상청 날씨 가져오기
 */

import { getWeatherData } from '../services/weatherService.js';

export const weatherApiHandler = async (req, res) => {
    try {
        const { base_date, base_time, nx, ny } = req.query;

        if (!base_date || !base_time || !nx || !ny) {
            return res.status(400).json({ error: 'Missing required query parameters' });
        }
        
        const data = await getWeatherData(base_date, base_time, nx, ny);
        res.json(data);

    } catch (error) {
        console.error('Error in Weather API Handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};