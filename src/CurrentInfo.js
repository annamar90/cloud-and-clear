import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './CurrentInfo.css';

export default function CurrentInfo(props) {
    return(
         <div className="col ms-auto currentinfo">
            <h3>{props.cityName}</h3>
            <h4>{props.time}</h4>
            <h5 className="italic">{props.date}</h5>
         </div>
    )
}