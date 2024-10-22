/**
 * 네이버 관련 
 */

import fetch from 'node-fetch';
import config from '../config/index.js';

export const getGeocode = async (address) => {
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(
        `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodedAddress}`,
        {
            headers: {
                'X-NCP-APIGW-API-KEY-ID': config.naver.id,
                'X-NCP-APIGW-API-KEY': config.naver.key,
            },
        }
    );
    
    if (!response.ok) {
        throw new Error('Failed to fetch data from Naver API');
    }
    
    return response.json();
};