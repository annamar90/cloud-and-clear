import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf } from '@fortawesome/free-solid-svg-icons';
import {tempsToStr} from './Helpers';
import 'bootstrap/dist/css/bootstrap.css';
import './CurrentTemps.css';

export default function CurrentTemps(props) {
    
    if(props.temp===null) {
        return null
    }

    const temps=tempsToStr(props.temp.temp, props.temp.temp_min, props.temp.temp_max, props.unitStr);

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
                <h3>{temps.t0}</h3>
                <h5>{temps.t1+"/"+temps.t2}</h5>
            </div>
        </div>

    )
}