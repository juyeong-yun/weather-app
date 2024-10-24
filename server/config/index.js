/**
 * 환경변수 및 설정
 */
import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT || 4000,
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
    naver: {
        id: process.env.API_Naver_ID,
        key: process.env.API_Naver_Key
    },
    weather: {
        key: process.env.API_Kisangcheong
    }
};