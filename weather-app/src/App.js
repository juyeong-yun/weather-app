import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';

import Main from "./pages/Main";
import WeatherTest from './pages/WeatherTest';
import ForecastTest from './pages/ForecastTest';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='menuBar'>
          <nav>
              <Link to="/">Main Page</Link>
              <Link to="/weather-test">Weather Example</Link>
              <Link to="/forecast-test">Forecast Example</Link>
            </nav>
            <Routes>
              <Route path='/' element={<Main />}/>
              <Route path='/weather-test' element={<WeatherTest />}/>
              <Route path='/forecast-test' element={<ForecastTest />}/>
            </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
