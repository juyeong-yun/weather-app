import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons'; // 필요한 아이콘 추가

import Main from "./pages/Main";
import WeatherTest from './pages/WeatherTest';
import ForecastTest from './pages/ForecastTest';
import KisangcheongTest from './pages/KisangcheongTest';

import './App.css';

function App() {
  return (
      <div className="App">
        <div className='container'>
          <div className='menuBar'>
            <nav>
                <Link to="/"><FontAwesomeIcon icon={faHouse} /></Link>
                <Link to="/weather-test">Weather</Link>
                <Link to="/forecast-test">Forecast</Link>
                <Link to="/kisangcheong-test">Kisangcheong</Link>
              </nav>
          </div>
        </div>
          <Routes>
            <Route path='/' element={<Main />}/>
            <Route path='/weather-test' element={<WeatherTest />}/>
            <Route path='/forecast-test' element={<ForecastTest />}/>
            <Route path='/kisangcheong-test' element={<KisangcheongTest />}/>
          </Routes>
      </div>
  );
}

export default App;
