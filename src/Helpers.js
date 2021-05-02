export function currentDate(timezone) {
  let months= ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  let now= new Date();

  if(timezone!==undefined) {
      now=new Date(now.getTime()+(timezone*1000));
  }

  let monthStr= months[now.getUTCMonth()];
  let dayStr= days[now.getUTCDay()];
  let day= now.getUTCDate();
  let year= now.getUTCFullYear();
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

export function currentTime() {
  let now= new Date();
  let minutesStr= now.getMinutes().toString();

  if (minutesStr.length <2) {
    minutesStr= "0" + minutesStr;
  }

  return now.getHours() + ":" + minutesStr;
}

export function queryUrl(cityName) {
    const apiKey= "f8ea34379b91acbd2b4566022d7f64a7";
    const apiUrl= "https://api.openweathermap.org/data/2.5/forecast?";
    const result= apiUrl + "q=" + cityName + "&appid=" + apiKey + "&units=metric";

    return result;
}

export function timestampToStr(timestamp, timezone) {
  let time;

  if(timezone!==undefined) {
    time=new Date((timestamp+timezone)*1000);
  }
  else {
    time=new Date((timestamp)*1000);
  }

  let minutes=time.getUTCMinutes().toString();

  if(minutes.length<2) {
    minutes="0"+minutes;
  }

  return time.getUTCHours()+":"+minutes;
}

export function getInfo(weather) {
  let status=weather[0].id;
  let statusGroup=parseInt(status.toString()[0]);

  let result={
    iconFile: "",
    backgroundFile: "",
    tip: {
        advice: "",
        emojis: "",
        url: ""
    }
  };

  switch(statusGroup) {
    case 2:
      result.iconFile="041-thunderstorm.svg";
      result.backgroundFile="Thunderstorm.jpg";

      result.tip.advice="Click me and check out some useful Lightning Safety tips!";
      result.tip.emojis="⚡👍";
      result.tip.url="https://www.nationalgeographic.com/environment/article/lightning-safety-tips";
      
      break;

    case 3:
      result.iconFile="046-weather.svg";
      result.backgroundFile="Spiderweb2.jpg";
      
      result.tip.advice="Click me and discover the beauty of Rain in art!";
      result.tip.emojis="🌂🎨";
      result.tip.url="https://artgallery.co.uk/blog/post/2017/01/06/capturing-the-beauty-of-the-rain-in-art";

      break;
    
    case 5:
      switch(status) {
        case 500:
        case 501:
        case 520:
          result.iconFile="046-weather.svg";
          result.backgroundFile="Spiderweb2.jpg";

          result.tip.advice="Click me and discover the beauty of Rain in art!";
          result.tip.emojis="🌂🎨";
          result.tip.url="https://artgallery.co.uk/blog/post/2017/01/06/capturing-the-beauty-of-the-rain-in-art";

          break;
        
        case 502:
        case 503:
        case 504:
        case 522:
        case 531:
          result.iconFile="027-rain.svg";
          result.backgroundFile="Rain.jpg";

          result.tip.advice="Click me and remember to drive safely in rainy weather!";
          result.tip.emojis="🚙☔";
          result.tip.url="https://driving-tests.org/beginner-drivers/how-to-drive-in-rain/";

          break;
        
        case 521:
          result.iconFile="005-rainbow.svg";
          result.backgroundFile="Rainbow.jpg";

          result.tip.advice="Click me and discover 17 awesome facts about Rainbows!";
          result.tip.emojis="🌈💡";
          result.tip.url="https://www.treehugger.com/curious-things-know-about-rainbows-4858620";

          break;
        
        case 511:
          result.iconFile="029-raindrop.svg";
          result.backgroundFile="Raindrop.jpg";

          result.tip.advice="Click me and find out how freezing rain forms!";
          result.tip.emojis="💧❓";
          result.tip.url="https://earthsky.org/earth/all-about-freezing-rain";

          break; 
      }
      break;

    case 6:
      switch(status) {
        case 600:
          result.iconFile="032-snowy.svg";
          result.backgroundFile="Snowy Mountains.jpg";

          result.tip.advice="Click me and make yourself a healthy, warm drink!";
          result.tip.emojis="☕😊";
          result.tip.url="https://www.ndtv.com/health/choose-these-healthy-drinks-to-stay-warm-this-winter-2327052";

          break;
          
           
        
        case 601:
        case 602:
          result.iconFile="033-snowy.svg";
          result.backgroundFile="Snowy woods.jpeg";

          result.tip.advice="Click me and have a look at these cool facts about Snow!";
          result.tip.emojis="🤓⛄";
          result.tip.url="https://www.bbcearth.com/blog/?article=surprising-facts-about-snow";

          break;
        
        case 611:
        case 612:
        case 613:
          result.iconFile="015-hail.svg";
          result.backgroundFile="Hail.jpg";

          result.tip.advice="Click me and see how to protect your car from hail damage!";
          result.tip.emojis="🚗🔺";
          result.tip.url="https://www.progressive.com/lifelanes/on-the-road/protect-car-from-hail/";
          
          break;
        
        case 621:
        case 622:
        case 615:
        case 616:
          result.iconFile="030-snow.svg";
          result.backgroundFile="Snow top.jpg";

          result.tip.advice="Click me and have a look at this useful emergency checklist!";
          result.tip.emojis="📑⛄";
          result.tip.url="https://www.theaa.com/driving-advice/seasonal/winter-checklist";
          
          break;

      }
      break;

    case 7:
      switch(status) {
        case 781:
          result.iconFile="042-tornado.svg";
          result.backgroundFile="Tornado.jpg";
          
          result.tip.advice="Click me and learn ways you can protect your family and home!";
          result.tip.emojis="🌀🏠";
          result.tip.url="https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/tornado.html";
          
          break;
        
        default:
          result.iconFile="016-haze.svg";
          result.backgroundFile="Misty woods.jpg";
          
          result.tip.advice="Click me and remember to ride safely!";
          result.tip.emojis="🚲👀";
          result.tip.url="https://www.bicycling.com/bikes-gear/g20017365/the-science-of-being-seen-a-guide-to-safer-riding/";
          
          break;
      }
      break;

    case 8:
      switch(status) {
        case 800:
          result.iconFile="036-sun.svg";
          result.backgroundFile="sunny poppies.jpg";
          
          result.tip.advice="Click me and safely enjoy your day in the Sun!";
          result.tip.emojis="🌞🔺";
          result.tip.url="https://careinthesun.org/sun-protection/ways-to-enjoy-the-sun-safely/";
          
          break;

        case 801:
        case 802:
          result.iconFile="007-cloudy day.svg";
          result.backgroundFile="Scattered Clouds.jpg";
          
          result.tip.advice="Click me and learn how to recognize clouds!";
          result.tip.emojis="⛅🔎";
          result.tip.url="https://www.thoughtco.com/types-of-clouds-recognize-in-the-sky-4025569";
          
          break;
        
        case 803:
          result.iconFile="006-cloudy.svg";
          result.backgroundFile="Cloudy valley.jpg";
          
          result.tip.advice="Click me and get inspired by these quotes!";
          result.tip.emojis="⛅📚";
          result.tip.url="https://resilientblog.co/inspirational/quotes-about-clouds/";
          
          break;

        case 804:
          result.iconFile="004-clouds.svg";
          result.backgroundFile="Broken Clouds.jpg";
          
          result.tip.advice="Click me and get your playlist for cloudy days!";
          result.tip.emojis="⛅🎶";
          result.tip.url="https://www.theodysseyonline.com/an-ode-to-overcast";
          
          break;
      }
      break;
    
    default:
      break;
  }

  return result;
}
