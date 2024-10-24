/**
 * 네이버 관련 
 */

import fetch from 'node-fetch';
import config from '../config/index.js';
import axios from 'axios';
import { query } from 'express';

export const getGeocode = async (address) => {
    const encodedAddress = encodeURIComponent(address);
    
    try {
        /*
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
    */

    const response = await axios.get ('https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode', {
        params :{
            query : encodedAddress
        },
        headers: {
            'X-NCP-APIGW-API-KEY-ID': config.naver.id,
            'X-NCP-APIGW-API-KEY': config.naver.key,
        }
    });
    return response.json();

    } catch (error){
        console.error("geocodong API Error:", error);
        throw error;
    }

};