/**
 * 현재 시간을 구하는
 * @returns 
 */
export const getCurrentDateTime = () => {
    const currentDate = new Date();
    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const date = String(currentDate.getDate()).padStart(2, "0");
    
    let hours = String(currentDate.getHours()).padStart(2, "0");
    
    // 자정에는 전 날짜로, 아니라면 한 시간씩 뒤로
    if (hours === "00") {
        hours = "23";
        currentDate.setDate(currentDate.getDate() - 1);
        
        // 날짜가 바뀌었으므로 년, 월, 일도 다시 계산
        return {
            baseDate: `${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, "0")}${String(currentDate.getDate()).padStart(2, "0")}`,
            baseTime: `${hours}00`
        };
    } else {
        hours = String(Number(hours) - 1).padStart(2, "0");
        return {
            baseDate: `${year}${month}${date}`,
            baseTime: `${hours}00`
        };
    }
};