# weather-app
reactJS 기반 토이프로젝트
    기간: - 11/05      
    주제: 원하는 지역에 대한 날씨를 검색하여, 온도에 맞는 옷차림을 추천 받는 웹페이지
      
## 기능
1. 원하는 지역의 날씨를 검색 
    - 날씨 데이터 : 공공데이터 날씨 예보 API
        - 단기 예보와 단기 실황 예보 데이터 추출
    - 지역 데이터 : 네이버맵 API 사용하여 좌표 추출
        - 범위 : 네이버맵 API를 사용하여 국내 시/도/동 까지 범위를 확장
        
2. 기온에 맞는 옷차림 추천
   - 기상청 API를 통해 가져온 온도 데이터를 활용하여, 온도에 맞는 옷차림을 추천

3. 페이지 설명  
   - Home : 메인화면으로 openWeatherMapAPI(geoAPI 포함), 공공데이터 날씨 예보 API 와 Naver geocodingAPI 를 사용하여 연결
       - Weather, Forecast : openWeatherMapAPI 에서 사용할 수 있는 두 가지 옵션 연결 test
       - Kisancheong : Main 페이지 연결 전, API 연결 test
       - Note : API 연결을 통해 공부한 점에 대해 작성

4. 기능 설명
   - 지역 : <code>useState('')</code> 를 사용하여 고정, 검색을 통해 지역 변경 가능하게 설정
   - 기온 : 하늘 상태에 따라 옆에 아이콘이 바뀌도록 설정 (코드값 : 4)
   - 강수 : <code>Recharts</code> 패키지를 활용하여 수치에 맞는 그래프를 그리도록 설정
   - 습도와 풍속 : 간단하게 수치만 작성되도록 설정
   - 기온에 맞는 옷 차림 : 온도에 따라 설정해놓은 이미지, 글자가 나오도록 설정
       - 이미지 : freepik
       - 아이콘 : fontawesome     
   
   - 페이지 첨부    
   <img width="800" alt="image" src="https://github.com/user-attachments/assets/7357e866-8196-4d2c-8172-939992ac5ce5">
  
    
## 서버 
- NodeJS(express) 연동

## 배포
- https://juyeong-yun.github.io/weather-app/  
  

  
---

📦server  
 ┣ 📂config  
 ┃ ┗ 📜index.js  
 ┣ 📂controllers  
 ┃ ┣ 📜naverController.js  
 ┃ ┗ 📜weatherController.js  
 ┣ 📂node_modules   
┣ 📂routes  
 ┃ ┣ 📜cacheControll.js  
 ┃ ┣ 📜index.js  
 ┃ ┣ 📜naverRoutes.js  
 ┃ ┗ 📜weatherRoutes.js  
 ┣ 📂services  
 ┃ ┣ 📜forecastWeatherService.js  
 ┃ ┣ 📜naverService.js  
 ┃ ┗ 📜realTimeWeatherService.js  
 ┣ 📂src  
 ┃ ┗ 📜setupProxy.js  
 ┗ 📜server.js  
  
  ---
    
📦weather-app  
 ┣ 📂node_modules   
📦src   
 ┣ 📂css  
 ┃ ┣ 📜main.css  
 ┃ ┗ 📜note.css  
 ┣ 📂images  
 ┣ 📂pages  
 ┃ ┣ 📜ClothingByTemperature.js  
 ┃ ┣ 📜ForecastTest.js  
 ┃ ┣ 📜KisangcheongTest.js  
 ┃ ┣ 📜Main.js  
 ┃ ┣ 📜Note.js  
 ┃ ┣ 📜RainProbabilityChart.js  
 ┃ ┗ 📜WeatherTest.js  
 ┣ 📂services  
 ┃ ┣ 📜apiService.js  
 ┃ ┗ 📜apiServiceTest.js  
 ┣ 📂utils  
 ┃ ┣ 📜codeChanging.js  
 ┃ ┣ 📜dateUtil.js  
 ┃ ┣ 📜getIcons.js  
 ┃ ┗ 📜gridConverter.js  
 ┣ 📜App.css  
 ┣ 📜App.js  
 ┣ 📜index.js  
 ┣ 📜reset.css  

