import React from "react";
import { BarChart, Bar } from 'recharts';

const RainProbabilityChart = ({forecastData}) => {
    
    const popData = forecastData.response.body.items.item
    .filter(item => item.category === "POP")
    .map((item, index) => ({
        name: Number(item.fcstValue)+'%',
        value : Number(item.fcstValue)
    }))

    return(
        <div className='pop-chart'>
            <BarChart width={100} height={40} data={popData}>
                <Bar dataKey="value" fill="#6AB4FE" />
            </BarChart>
        </div>
    );
};

export default RainProbabilityChart;