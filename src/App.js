import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import WeekDay from './WeekDay';
import DayDetails from './DayDetails';
import CurrentInfo from './CurrentInfo';
import CurrentWeather from './CurrentWeather';
import CurrentTemps from './CurrentTemps';
import axios from 'axios';
import './App.css';


function currentDate(timezone) {
  let months= ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  let now= new Date();

  if(timezone!==undefined) {
      now=new Date(now.getTime()+(timezone*1000));
  }

  let monthStr= months[now.getMonth()];
  let dayStr= days[now.getDay()];
  let day= now.getDate();
  let year= now.getFullYear();
  let daySuff;
  
  switch(day)
  {
    case 1:
    case 21:
    case 31:
      daySuff="st";
      break;

    case 2:
    case 22:
      daySuff="nd";
      break;

    case 3:
    case 23:
      daySuff="rd";
      break;

    default:
      daySuff="th";
      break;
  }

  return dayStr + ", " + day + daySuff + " " + monthStr + " " + year;
}

function currentTime() {
  let now= new Date();
  let minutesStr= now.getMinutes().toString();

  if (minutesStr.length <2) {
    minutesStr= "0" + minutesStr;
  }

  return now.getHours() + ":" + minutesStr;
}

function queryUrl(cityName) {
    const apiKey= "f8ea34379b91acbd2b4566022d7f64a7";
    const apiUrl= "https://api.openweathermap.org/data/2.5/forecast?";
    const result= apiUrl + "q=" + cityName + "&appid=" + apiKey + "&units=metric";

    return result;
}

function timestampToStr(timestamp, timezone) {
  let time=new Date((timestamp+timezone)*1000);
  let minutes=time.getUTCMinutes().toString();

  if(minutes.length<2) {
    minutes="0"+minutes;
  }

  return time.getUTCHours()+":"+minutes;
}

function App() {
    const [init, setInit] = useState(0);
    const [unit, setUnit] = useState("C");
    const [temperature, setTemperature] = useState(null);
    const [dateStr, setDateStr] = useState ("");
    const [timeStr, setTimeStr] = useState ("");
    const [cityName, setCityName] = useState ("Helsinki");
    
    function handleSearch(event) {
        event.preventDefault();
        const data= new FormData(event.target);
        let cityQuery= data.get("searchBar").trim();

        if(cityQuery.length===0) {
            return;
        }

        axios.get(queryUrl(cityQuery)).then(handleResponse);
    }

    function handleResponse(response) {
        setInit(2);
        setCityName(response.data.city.name);

        setTimeStr(timestampToStr(new Date().getTime()/1000, response.data.city.timezone));
        setDateStr(currentDate(response.data.city.timezone));
        
        setTemperature(response.data.list[0].main);

        console.log(response)
    }

    if (init===0) {
        setInit(1);
        axios.get(queryUrl(cityName)).then(handleResponse);
        return null
    }

    if(init===1) {
        return null;
    }

  return (
<div className="background" id="container">
    <div className="opacity col-sm-10 col-md-10 col-12 col-xl-10 col-lg-10 col-xxl-10">
        <div className="container">
            <div className="row">
                <CurrentInfo
                    cityName= {cityName}
                    time= {timeStr}
                    date= {dateStr}
                />
                <CurrentWeather
                    icon="030-snow.svg"
                    text="snowy"
                />
               
                <CurrentTemps
                    temp= {temperature}
                    setUnit={setUnit}
                    unitStr={unit}
                />

            </div>

            <div className="row">
                <div className="col advice">
                    <a className="advice-text" href="https://github.com/annamar90/Weather-App" id="adviceLink" target="_blank">Tips</a>
                    <span id="adviceIcon"></span>
                </div>
            </div>

            <div className="card-group">
                <DayDetails
                    title="Humidity"
                    icon="019-humidity.svg"
                    text="45%"
                />
                 <DayDetails
                    title="Wind Speed"
                    icon="049-windsock.svg"
                    text="20 km/h"
                />
                <DayDetails
                    title="Sunrise"
                    icon="012-dawn.svg"
                    text="06:36 am"
                />
                <DayDetails
                    title="Sunset"
                    icon="037-sunset.svg"
                    text="18:36 pm"
                />
            </div> 
            
                
                <div className="row nextdays">
                    <WeekDay
                        day="Monday"
                        icon="036-sun.svg"
                        description="sunny"
                        minTemp="-3"
                        maxTemp="7"
                        unitStr="C"
                    />
                    <WeekDay
                        day="Tuesday"
                        icon="007-cloudy day.svg"
                        description="cloudy"
                        minTemp="0"
                        maxTemp="2"
                        unitStr="C"
                    />
                    <WeekDay
                        day="Wednesday"
                        icon="041-thunderstorm.svg"
                        description="stormy"
                        minTemp="5"
                        maxTemp="12"
                        unitStr="C"
                    />
                    <WeekDay
                        day="Thursday"
                        icon="033-snowy.svg"
                        description="snowy"
                        minTemp="-1"
                        maxTemp="2"
                        unitStr="C"
                    />
                </div>
            
    
                <div className="container" >
                    <div className="row justify-content-center" >
                        <div className="inputCol col">
                            <form className="input-group input-group-sm mb-3" onSubmit={handleSearch}>
                                <button className="btn btn-success" type="submit" id="button-addon1">Search City</button>
                                <input name="searchBar" type="text" className="form-control" aria-label="Search city input" aria-describedby="button-addon1" placeholder="Helsinki, FI" />  
                            </form>
                        </div>
                        <div className="buttonCol col">
                            <button className="btn btn-primary" type="submit" id="buttonloc">Find me 🧭</button>
                        </div>
                    </div>
                </div>
                
                
                
                
            
            <div className="signature">
                <p>
                <a href="https://github.com/annamar90/Weather-App" id="githublink">See it on GitHub 🔎</a>
                   Coded by Anna Marasso</p>
            </div>
    </div>
</div>
</div>

  );
}

export default App;
