//  ./utils/getIcons.js
import {getSkyType} from './codeChanging';

import sunny from '../images/sunny.png';
import cloudy from '../images/cloudy.png';
import fog from '../images/fog.png';

const iconMapper = {
    '맑음': {
        icon: sunny,
        alt: '맑은 날씨'
    },
    '구름 많음': {
        icon: cloudy,
        alt: '구름 많은 날씨'
    },
    '흐림': {
        icon: fog,
        alt: '흐린 날씨'
    },
};

// 상태에 따른 아이콘과 대체 텍스트 반환 함수
export const getWeatherIcon = (fcstValue) =>{
    const state = getSkyType(fcstValue);

    // iconMapper[state] : 현재 상태(state)에 해당하는 값을 찾아 반환
    return iconMapper[state] || {icon:'', alt:''};
};