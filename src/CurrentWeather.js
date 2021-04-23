import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './CurrentWeather.css';

export default function CurrentWeather(props) {
    const icon="icons/"+props.icon;

    return( 
        <div className="col justify-content-center">
            <div className="row justify-content-center">
                <img src={icon} className="currenticon"/>
            </div>
            <div className="row justify-content-center">
                <h6 className="currentweather">{props.text}</h6>
            </div>
        </div>
    )
}