const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  // /weather-app/api 경로에 대한 프록시 설정
  app.use(
    proxy('/weather-app/api', { 
      target: 'http://localhost:4000/', // 통신할 서버의 도메인주소
      changeOrigin: true,
    })
  );

  // /weather-app/kisangcheong-test/api 경로에 대한 프록시 설정
  app.use(
    proxy('/weather-app/kisangcheong-test/api', { 
      target: 'http://localhost:4000/', // 통신할 서버의 도메인주소
      changeOrigin: true,
    })
  );
}