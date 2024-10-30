// ./services/naverService.js
// 네이버 API 연결

import fetch from 'node-fetch';
import config from '../config/index.js';
import axios from 'axios';
import { query } from 'express';

export const getGeocode = async (address) => {
    // const encodedAddress = encodeURIComponent(address);
    // console.log(`encodedAddress: ${encodedAddress}, address : ${address}}`);
    
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
            query : address
        },
        headers: {
            'X-NCP-APIGW-API-KEY-ID': config.naver.id,
            'X-NCP-APIGW-API-KEY': config.naver.key,
        }
    });
    // response.data를 사용하여 JSON 데이터를 반환
    // console.log("res data (JSON):", JSON.stringify(response.data, null, 2));
    return response.data;


    } catch (error){
        console.error("geocodong API Error:", error);
        throw error;
    }

};