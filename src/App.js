import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import WeekDays from './WeekDays';
import DayDetails from './DayDetails';
import CurrentInfo from './CurrentInfo';
import CurrentWeather from './CurrentWeather';
import CurrentTemps from './CurrentTemps';
import axios from 'axios';
import {currentDate, getInfo, queryUrl, timestampToStr} from './Helpers';
import './App.css';

function App() {
    const [init, setInit] = useState(0);
    const [unit, setUnit] = useState("C");
    const [temperature, setTemperature] = useState(null);
    const [dateStr, setDateStr] = useState ("");
    const [timeStr, setTimeStr] = useState ("");
    const [forecastDays, setForecastDays] = useState (null);
    const [cityName, setCityName] = useState ("Helsinki");
    const [dayDetails, setDayDetails] = useState({
        humidity: "",
        windspeed: "",
        sunrise: "",
        sunset: ""
    });

    const [currentWeatherBackground, setCurrentWeatherBackground] = useState("CloudySky.jpg");

    const [currentWeatherInfo, setCurrentWeatherInfo] = useState ({
        description: "",
        icon: ""
    });

    const [currentWeatherTip, setCurrentWeatherTip] = useState({advice: "",
        emojis: "",
        url: ""
    });

    
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

        const weatherInfo=getInfo(response.data.list[0].weather);
        setCurrentWeatherInfo({description: response.data.list[0].weather[0].description,
        icon: weatherInfo.iconFile});
        setCurrentWeatherTip(weatherInfo.tip);
        setCurrentWeatherBackground(weatherInfo.backgroundFile);

        setDayDetails({
            humidity: response.data.list[0].main.humidity,
            windspeed: response.data.list[0].wind.speed,
            sunrise: timestampToStr(response.data.city.sunrise, response.data.city.timezone),
            sunset: timestampToStr(response.data.city.sunset, response.data.city.timezone),
        });

        handleForecast(response.data.city);
    }

    function handleForecast(cityQuery) {

        const excludedParts= "current,minutely,hourly";
        const apiKey="f8ea34379b91acbd2b4566022d7f64a7";
        const lat=cityQuery.coord.lat;
        const lon=cityQuery.coord.lon;
        const apiUnits="metric";
        const apiUrl="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude="+excludedParts+"&appid="+apiKey+"&units=" + apiUnits;

        axios.get(apiUrl).then(handleForecastResult);
    }

    function handleForecastResult(response) {
        setForecastDays(response.data.daily)
    }

    function handleFindMe() {
        navigator.geolocation.getCurrentPosition(handleFindMeResult);
    }

    function handleFindMeResult(pos) {
        let lat= pos.coords.latitude;
        let lon= pos.coords.longitude;

        let apiUnits="metric";

        let apiKey= "f8ea34379b91acbd2b4566022d7f64a7";
        let apiUrl= "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + apiUnits + "&appid=" + apiKey;


        axios.get(apiUrl).then((resp)=>{axios.get(queryUrl(resp.data.name)).then(handleResponse)});
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
<div className="background" id="container"
style={{
  backgroundImage: "url('images/"+currentWeatherBackground+"')",
  minHeight: "100vh",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  overflow: "auto",
  paddingTop: "1%"
}}>
    <div className="opacity col-sm-10 col-md-10 col-12 col-xl-10 col-lg-10 col-xxl-10">
        <div className="container">
            <div className="row">
                <CurrentInfo
                    cityName= {cityName}
                    time= {timeStr}
                    date= {dateStr}
                />
                <CurrentWeather
                    icon= {currentWeatherInfo.icon}
                    text= {currentWeatherInfo.description}
                />
               
                <CurrentTemps
                    temp= {temperature}
                    setUnit={setUnit}
                    unitStr={unit}
                />

            </div>

            <div className="row">
                <div className="col advice">
                    <a className="advice-text" href= {currentWeatherTip.url} id="adviceLink" target="_blank">{currentWeatherTip.advice}</a>
                    <span id="adviceIcon">{currentWeatherTip.emojis}</span>
                </div>
            </div>

            <div className="card-group">
                <DayDetails
                    title="Humidity"
                    icon="019-humidity.svg"
                    text={dayDetails.humidity+"%"}
                />
                 <DayDetails
                    title="Wind Speed"
                    icon="049-windsock.svg"
                    text={dayDetails.windspeed+" km/h"}
                />
                <DayDetails
                    title="Sunrise"
                    icon="012-dawn.svg"
                    text={dayDetails.sunrise}
                />
                <DayDetails
                    title="Sunset"
                    icon="037-sunset.svg"
                    text={dayDetails.sunset}
                />
            </div> 
                
            <div className="row nextdays">
                <WeekDays
                    forecastDays={forecastDays}
                    unitStr={unit}
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
                        <button className="btn btn-primary" type="submit" id="buttonloc" onClick={handleFindMe}>Find me 🧭</button>
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
