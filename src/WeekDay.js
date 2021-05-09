import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './WeekDay.css';

export default function WeekDay(props) {
    const icon="icons/"+props.icon;
    const minTemp=props.minTemp;
    const maxTemp=props.maxTemp;

    return (
        <div className="col">
            <p>{props.day}</p>
            <img src={icon} className="daysicon"/>
            <p className="daysdescription">{props.description}</p>
            <p className="daystemp">{minTemp+"/"+maxTemp}</p>
        </div>
    )

}