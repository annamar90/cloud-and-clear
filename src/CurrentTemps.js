import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import './CurrentTemps.css';

function toFarenheit(val) {
    return Math.round((val*(9/5))+32);
}

export default function CurrentTemps(props) {
    
    if(props.temp===null) {
        return null
    }

    let tempVal=props.temp.temp;
    let minTempVal=props.temp.temp_min;
    let maxTempVal=props.temp.temp_max;

    if(props.unitStr==="F") {
        tempVal=toFarenheit(tempVal);
        minTempVal=toFarenheit(minTempVal);
        maxTempVal=toFarenheit(maxTempVal);
    }
    else {
        tempVal=Math.round(tempVal);
        minTempVal=Math.round(minTempVal);
        maxTempVal=Math.round(maxTempVal);
    }

    const currentTemp=tempVal+" °"+props.unitStr;
    const minTemp=minTempVal+" °"+props.unitStr;
    const maxTemp=maxTempVal+" °"+props.unitStr;

    function handleThermometerClick() {
        let newUnit;

        if(props.unitStr==="C") {
            newUnit="F";
        }
        else {
            newUnit="C";
        }

        props.setUnit(newUnit);
    }

    return(
        <div className="col me-auto currenttemperature">
            <div className="tempicon">
                <a href="#" id="thermometer" onClick={handleThermometerClick}>
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