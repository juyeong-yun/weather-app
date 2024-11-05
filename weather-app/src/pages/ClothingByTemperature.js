import React from 'react';
import hot from'../images/hot.png';
import fireceness from'../images/fireceness.png';
import windy from '../images/windy.png';
import cold from '../images/cold.png';
import freezing from'../images/freezing.png';
import snowing from'../images/snowing.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVestPatches} from '@fortawesome/free-solid-svg-icons';

const ClothingByTemperature = ({realTimeData}) => {

    const temp = realTimeData.response.body.items.item.find(item => item.category === "T1H")?.obsrValue;

    let clothingRecommendation = {
        img: '',
        text: ''
    };

    if (temp !== null) {

        if (temp >= 28) {
            clothingRecommendation = {
                img : hot,
                text:`민소매, 반팔, 반바지, 짧은 치마, 린넨\n
                    더운 날씨에는 가벼운 여름옷을 추천해요.\n
                    쨍쨍한 태양 아래에서 시원하게 지내세요!`
            };
        } else if (temp >= 23) {
            clothingRecommendation = {
                img : fireceness,
                text:`반팔, 얇은 셔츠, 반바지, 면바지\n
                비교적 가벼운 옷을 추천해요.\n
                여름의 따뜻함을 느끼며 자유롭게 활동하세요!`
            };
        } else if (temp >= 20) {
            clothingRecommendation = {
                img : windy,
                text:`블라우스, 긴팔티, 면바지, 슬랙스\n
                누군가에게는 추울 수도 있어요.\n
                여유롭고 스타일리시하게 거리를 걸어보세요!`
            };
        } else if (temp >= 17) {
            clothingRecommendation = {
                img : windy,
                text:`얇은 가디건, 니트, 맨투맨, 후드, 긴 바지\n
                두께감 있는 옷이 필요할 것 같아요.\n
                편안함과 따뜻함을 동시에 챙겨보세요!`
            };
        } else if (temp >= 12) {
            clothingRecommendation = {
                img : cold,
                text: `자켓, 가디건, 청자켓, 니트, 스타킹, 청바지\n
                외투의 계절이 왔어요.\n
                따뜻하고 스타일리시한 가을 패션을 즐겨보세요!`
            };
        } else if (temp >= 9) {
            clothingRecommendation = {
                img : cold,
                text:`트렌치 코트, 야상, 점퍼, 스타킹, 기모바지\n
                선선한 날씨에는 두툼한 외투가 필요할 수 있어요.\n
                멋진 스타일로 길을 나서보세요!`
            };
        } else if (temp >= 5) {
            clothingRecommendation = {
                img : freezing,
                text:`울코트, 히트텍, 가죽옷, 기모\n
                추운 날씨에는 따뜻한 겨울옷을 착용해요.\n
                포근하게 몸을 감싸보세요!`
            };
        } else {
            clothingRecommendation = {
                img : snowing,
                text:`패딩, 두꺼운 코트, 누빔 옷, 기모, 목도리, 장갑
                혹독한 추위에 맞서는 따뜻한 패션을 준비하세요!`
            };
        }
    }
    
    console.log(clothingRecommendation.img);

    return (
        <div>
            <div className='recommonImg'>
                {clothingRecommendation.img && <img src={clothingRecommendation.img} alt="추천 옷차림" />}
            </div>
                {/* 
                .map((line, index) => ... ): 나눈 각 줄(line)에 대해 map 함수를 호출하여 새로운 JSX 요소로 변환
                <span key={index}>: 각 줄을 <span>으로 감싸며, React에서 각 요소의 고유성을 보장하기 위해 key 속성을 사용 
                */}
            
            <div className='recommonText'>
            <h3><FontAwesomeIcon icon={faVestPatches} style={{ marginRight: '5px' }} />옷차림 추천</h3>
                {clothingRecommendation.text.split('\n').map((line, index) => (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ClothingByTemperature;