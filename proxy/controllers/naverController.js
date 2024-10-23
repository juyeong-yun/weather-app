/**
 * geocoding 좌표
 */

import { getGeocode } from '../services/naverService.js';

export const naverApiHandler = async (req, res) => {
    try {
        const { query: address } = req.query;
        
        if (!address) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }
        
        const data = await getGeocode(address);
        // console.log("naver: " ,data);
        
        res.json(data);
    } catch (error) {
        console.error('Error in Naver API Handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};