import React from "react";
import WeekDay from './WeekDay';
import {getInfo, tempsToStr} from './Helpers';

const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export default function WeekDays (props) {
    
    if (props.forecastDays===null){
        return null;
    }

    const today=new Date().getUTCDay();

    function dayName(dayNumber){
        return days[(today+dayNumber)%7];
    }

    let res= [];

    for(let k=1; k<6; ++k) {
        const day=dayName(k);
        const temps=tempsToStr(props.forecastDays[k].temp.min, props.forecastDays[k].temp.max, 0, props.unitStr);

        res.push(
        <WeekDay
            key={day}
            day={day}
            icon={getInfo(props.forecastDays[k].weather).iconFile}
            description={props.forecastDays[k].weather[0].description}
            minTemp={temps.t0}
            maxTemp={temps.t1}
        />
        );
    }

    return (
        <>
            {res}
        </>
    )
}