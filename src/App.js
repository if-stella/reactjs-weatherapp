import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CountUp from 'react-countup';
import Moment from 'react-moment';
import 'moment-timezone';

import { BsWind, BsCloudRain, BsCloudDrizzle, BsCloudSnow, BsCloudFog2, BsCloudSun, BsCloudMoon } from 'react-icons/bs';
import { FiDroplet, FiSun, FiSunrise, FiSunset} from 'react-icons/fi';
import { TbTemperature,TbCloudStorm, TbMist, TbTornado } from 'react-icons/tb';
import {RiMoonClearLine} from 'react-icons/ri';

function App() {

  const [data, setData] = useState({});
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [time, setTime] = useState('');
  const [timezone, setTimezone] = useState('');
  const [location, setLocation] = useState('');
  const [imgUrl,setImgUrl] = useState([]);

  const AXIOS_KEY = process.env.REACT_APP_AXIOS_KEY;
  const USPLA_KEY = process.env.REACT_APP_USPLA_KEY;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${AXIOS_KEY}`)
      .then((response) => {
        setData(response.data)
        setTimezone(response.data.timezone)
      })
      axios.get(`https://api.unsplash.com/search/photos?page=1&query=${location}&client_id=${USPLA_KEY}`)
      .then((background) => {
        setImgUrl(background.data.results[5].urls.regular)
      })
    setLocation('')
    }
  }

  useEffect (() => {if (data && timezone)
    {
    const sunrise = new Date((data.sys.sunrise + data.timezone) * 1000)
    const localsunrise = sunrise.toLocaleString("en-GB", { timeZone: "UTC" })
    setSunrise(localsunrise)
    }},[data, timezone])

  useEffect (() => {if (data && timezone)
    {
    const sunset = new Date((data.sys.sunset + data.timezone) * 1000)
    const localsunset = sunset.toLocaleString("en-GB", { timeZone: "UTC" })
    setSunset(localsunset)
    }},[data, timezone])

  useEffect (() => {if (data && timezone)
    {
    const currenttime = new Date((data.dt + data.timezone) * 1000)
    const localtime = currenttime.toLocaleString("en-GB", { timeZone: "UTC" })
    setTime(localtime)
    console.log(time)
    }},[data, timezone])


  const divStyle = {
    backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 21.57%, rgba(0, 0, 0, 0.153637) 83.67%, rgba(0, 0, 0, 0.5) 100%), url(' + imgUrl + ')',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  };

  return (
    <div className="app" style={divStyle}>
      <div className="search">
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type="text" />
      </div>
      <div className="container" >
        <div className="top">
          <div className="location">
            <h2>{data.name}</h2>
          </div>
          <div className="temperature">
            {data.main ? <h1><CountUp end={data.main.temp.toFixed()} />°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <div className="des-and-icon">
            { data.weather[0].main === "Clear" ? <p className="weather-icon"><FiSun /></p> : null }
            { data.weather[0].main === "Clouds" ? <p className="weather-icon"><BsCloudSun /></p> : null }
            { data.weather[0].main === "Drizzle" ? <p className="weather-icon"><BsCloudRain /></p> : null }
            { data.weather[0].main === "Fog" ? <p className="weather-icon"><BsCloudFog2 /></p> : null }
            { data.weather[0].main === "Mist" ? <p className="weather-icon"><TbMist /></p> : null }
            { data.weather[0].main === "Rain" ? <p className="weather-icon"><BsCloudDrizzle /></p> : null }
            { data.weather[0].main === "Snow" ? <p className="weather-icon"><BsCloudSnow /></p> : null }
            { data.weather[0].main === "Thunderstorm" ? <p className="weather-icon"><TbCloudStorm /></p> : null }
            { data.weather[0].main === "Tornado" ? <p className="weather-icon"><TbTornado /></p> : null }
            <p>{data.weather[0].main}</p>
            </div> : null}
          </div>
        </div>
        {data.main ?
          <div className="timebox">
            <div className="sunrise">
              {data.main ? <p className="bold timefont"><Moment unix format="HH:mm">{data.sys.sunrise}</Moment></p> : null}
              {data.main ? <p className="small"><FiSunrise /></p> : null}
            </div>
            <div className="time">
              {data.main ? <p className="bold timefont"><Moment unix format="HH:mm">{data.dt}</Moment></p> : null}
              {data.main ? <p className="small"><FiSun /></p> : null}
            </div>
            <div className="sunset">
              {data.main ? <p className="bold timefont"><Moment unix format="HH:mm">{data.sys.sunset}</Moment></p> : null}
              {data.main ? <p className="small"><FiSunset /></p> : null}
            </div>
          </div> : null}
        {data.main ?  <div className="bottom">
          <div className="feelslike">
            {data.main ? <p className="bold"><CountUp end={data.main.feels_like.toFixed()} />°C</p> : null}
            {data.main ? <p className="small"><TbTemperature />Feels like</p> : null}
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">
              <CountUp
              end={data.main.humidity} />%</p> : null}
            {data.main ? <p className="small"><FiDroplet/>Humidity</p> : null}
          </div>
          <div className="wind">
            {data.wind ? <p className="bold"><CountUp end={data.wind.speed} /> m/s</p> : null}
            {data.main ? <p className="small"><BsWind/>Wind</p> : null}
          </div>
        </div> : null}
      </div>
    </div>
  );
}

export default App;
/*
{data.main ? <img src={result[0].urls.small} alt="City"/> : null}
{hour >= 6 && hour < 20 ? "day!" : "night!" }
*/
