# weather-app
reactJS 기반 토이프로젝트

## 기능
1. 원하는 지역의 날씨를 검색 
    - 지역 범위  
        - 국내 세부 지역 (동까지)
    - 날씨  
        - 공공데이터 포털 API 
    - 위치
        - 네이버맵 API 사용
        
2. 기온에 맞는 옷차림 추천  
  
    
## 서버 (NodeJS(express) 연동 진행중)
https://juyeong-yun.github.io/weather-app/  
  
---

📦proxy  
 ┣ 📂config  
 ┃ ┗ 📜index.js  
 ┣ 📂controllers  
 ┃ ┣ 📜naverController.js  
 ┃ ┗ 📜weatherController.js  
 ┣ 📂node_modules   
 ┣ 📂routes  
 ┃ ┣ 📜index.js  
 ┃ ┣ 📜naverRoutes.js  
 ┃ ┗ 📜weatherRoutes.js  
 ┣ 📂services  
 ┃ ┣ 📜naverService.js  
 ┃ ┗ 📜weatherService.js  
 ┣ 📜.env  
 ┣ 📜package.json  
 ┗ 📜server.js  
  
  
📦weather-app  
 ┣ 📂node_modules  
 ┣ 📂src  
 ┃ ┣ 📂css  
 ┃ ┃ ┗ 📜main.css  
 ┃ ┣ 📂pages  
 ┃ ┃ ┣ 📜ForecastTest.js  
 ┃ ┃ ┣ 📜KisangcheongTest.js  
 ┃ ┃ ┣ 📜Main.js  
 ┃ ┃ ┗ 📜WeatherTest.js  
 ┃ ┣ 📂utils  
 ┃ ┃ ┣ 📜dateUtil.js  
 ┃ ┃ ┗ 📜gridConverter.js  
 ┃ ┣ 📜App.css  
 ┃ ┣ 📜App.js  
 ┃ ┣ 📜App.test.js  
 ┃ ┣ 📜index.css  
 ┃ ┣ 📜index.js  
 ┃ ┣ 📜logo.svg    
 ┃ ┣ 📜reset.css  
 ┣ 📜.env  
 ┣ 📜.gitignore  
 ┣ 📜README.md  
 ┗ 📜package.json  
