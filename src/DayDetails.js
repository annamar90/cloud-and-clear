import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './DayDetails.css';

export default function DayDetails(props) {
    const icon="icons/"+props.icon;

    return(
        <div className="card">
            <div className="card-body text-center">
                <h5 className="card-header">{props.title}</h5>
                <img src={icon} className="cardIcon"/>
                <p className="card-text">{props.text}</p> 
            </div>
        </div>
    )
}