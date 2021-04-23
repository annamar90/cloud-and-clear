import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import WeekDay from './WeekDay';
import DayDetails from './DayDetails';
import CurrentInfo from './CurrentInfo';
import CurrentWeather from './CurrentWeather';
import CurrentTemps from './CurrentTemps';
import './App.css';

function App() {
  return (

<div className="background" id="container">
    <div className="opacity col-sm-10 col-md-10 col-12 col-xl-10 col-lg-10 col-xxl-10">
        <div className="container">
            <div className="row">
                <CurrentInfo
                    cityName= "Dolo"
                    time= "16:32"
                    date= "Sunday, 04th April 2021"
                />
                <CurrentWeather
                    icon="030-snow.svg"
                    text="snowy"
                />
               
                <CurrentTemps
                    temp="5"
                    minTemp="-1"
                    maxTemp="3"
                    unitStr="C"
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
                            <form className="input-group input-group-sm mb-3">
                                <button className="btn btn-success" type="submit" id="button-addon1">Search City</button>
                                <input type="text" className="form-control" aria-label="Search city input" aria-describedby="button-addon1" placeholder="Helsinki, FI" />  
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
