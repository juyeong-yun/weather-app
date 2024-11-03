// src/utils/dateUtil.js

/**
 * 현재 날짜, 시간
 * 초단기 실황 API는 매 정시에 생성되고, 10분마다 최신 정보로 업데이트됨
 * @returns 
 */
export const getCurrentDateTime = () => {
    const currentDate = new Date();
    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const date = String(currentDate.getDate()).padStart(2, "0");
    
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    // 10분 단위로 내림 처리 (00, 10, 20, 30, 40, 50)
    let roundedMinutes;
    if (minutes < 10) {
        roundedMinutes = "00";
    } else {
        roundedMinutes = String(Math.floor(minutes / 10) * 10).padStart(2, "0");
    }

    // 자정에는 전 날짜로, 아니라면 한 시간씩 뒤로
    if (hours === "00" && roundedMinutes === "00") {
        hours = "23";
        currentDate.setDate(currentDate.getDate() - 1);
    } else if (roundedMinutes === "00") {
        hours = String(Number(hours) - 1).padStart(2, "0");
    }

    // 현재 시각이 10분 이상이면 해당 시간을 기준으로 요청
    if (minutes >= 10) {
        return {
            baseDate: `${year}${month}${date}`,
            baseTime: `${hours}${roundedMinutes}`
        };
        // 10분 미만이면 이전 시간대의 데이터를 요청
    } else {
        return {
            baseDate: `${year}${month}${date}`,
            baseTime: `${String(Number(hours) - 1).padStart(2, "0")}50`
        };
    }
};

export const getNearestBaseTime = (base_time) => {
    // 기상청에서 제공하는 시간 목록 (시간 단위로만 표시)
    const availableBaseTimes = ['0210', '0510', '0810', '1110', '1410', '1710', '2010', '2310'];

    // 시간만 자르기
    const currentHour = base_time.slice(0,2);

    const nearestBaseTime = availableBaseTimes.reverse().find(time => time < `${currentHour}10`);
    
    // 만약 현재 시간이 가장 큰 시간보다 크면, 가장 작은 시간으로 설정
    return nearestBaseTime || availableBaseTimes[0]; // 다음 날의 첫 번째 base_time으로 설정
};
