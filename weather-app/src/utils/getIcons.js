//  ./utils/getIcons.js
import {getSkyType} from './codeChanging';

export const getWeatherIcon = async(fcstValue) => {
    const state = getSkyType(fcstValue);

    if(state === '맑음') {
        return "../imges/sunny.png";
    } else if (state === '구름 많음'){
        return "../imges/cloudy.png"
    } else if (state === '흐림'){
        return "../imges/fog.png"
    } else {
        
    }
};