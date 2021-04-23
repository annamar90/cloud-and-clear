import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import './CurrentTemps.css';

export default function CurrentTemps(props) {
    const currentTemp=props.temp+" °"+props.unitStr;
    const minTemp=props.minTemp+" °"+props.unitStr;
    const maxTemp=props.maxTemp+" °"+props.unitStr;

    return(
        <div className="col me-auto currenttemperature">
            <div className="tempicon">
                <a href="#" id="thermometer">
                    <FontAwesomeIcon icon={faThermometerHalf} />
                </a>
            </div>
            <div className="temp-text">
                <h3>{currentTemp}</h3>
                <h5>{minTemp+"/"+maxTemp}</h5>
            </div>
        </div>

    )
}