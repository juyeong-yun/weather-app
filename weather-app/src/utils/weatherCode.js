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