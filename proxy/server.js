const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// 네이버 API 프록시
app.get('/api/naver', async (req, res) => {
    const address = req.query.query;
    const geoID = process.env.NAVER_API_ID;
    const geoKey = process.env.NAVER_API_KEY;

    const response = await fetch(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${address}`, {
        headers: {
            'X-NCP-APIGW-API-KEY-ID': geoID,
            'X-NCP-APIGW-API-KEY': geoKey,
        },
    });

    const data = await response.json();
    res.json(data);
});

// 날씨 API 프록시
app.get('/api/weather', async (req, res) => {
    const { base_date, base_time, nx, ny } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;

    const response = await fetch(`http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${apiKey}&numOfRows=10&pageNo=1&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`);
    
    const data = await response.json();
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
