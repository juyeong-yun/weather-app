/**
 * 강수 형태 반환 함수
 *  */ 
export const getPrecipitationType = (obsrValue) => {
    switch (obsrValue) {
        case "0":
            return "없음";
        case "1":
            return "비";
        case "2":
            return "비/눈";
        case "3":
            return "눈";
        case "5":
            return "빗방울";
        case "6":
            return "빗방울눈날림";
        case "7":
            return "눈날림";
        default:
            return "알 수 없음"; // 정의되지 않은 경우
    }

};

/**
 * 하늘 상태 코드변환
 * @param {} fcstValue 
 */
export const getSkyType = (fcstValue) => {
    switch(fcstValue){
        case "1" & "2" & "3" & "4" & "5" : return "맑음";
        case "6" & "7" & "8" : return "구름 많음";
        case "9" & "10" : return "흐림";
        default : return "상태변화 없음"
    }
};