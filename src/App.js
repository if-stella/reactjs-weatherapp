import React, {useState} from 'react'
import axios from 'axios'
import { BsWind, BsCloudRain, BsCloudDrizzle, BsCloudSnow, BsCloudFog2 } from 'react-icons/bs';
import { FiDroplet } from 'react-icons/fi';
import { TbTemperature,TbCloudStorm } from 'react-icons/tb';
import {MdOutlineWbSunny, MdOutlineWbCloudy} from 'react-icons/md';
import {TbMist, TbTornado} from 'react-icons/tb';

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const MY_KEY = process.env.REACT_APP_API_KEY;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${MY_KEY}`)
      .then((response) => {
        setData(response.data)
        console.log(response.data)
      })
    setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type="text" />
      </div>


      <div className="container">
        <div className="top">
          <div className="location">
            <h2>{data.name}</h2>
          </div>
          <div className="temperature">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <div className="des-and-icon">
            { data.weather[0].main === "Clear" ? <p className="weather-icon"><MdOutlineWbSunny /></p> : null }
            { data.weather[0].main === "Clouds" ? <p className="weather-icon"><MdOutlineWbCloudy /></p> : null }
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
        {data.main ?  <div className="bottom">
          <div className="feelslike">
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
            {data.main ? <p className="small"><TbTemperature />Feels like</p> : null}
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            {data.main ? <p className="small"><FiDroplet/>Humidity</p> : null}
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed} m/s</p> : null}
            {data.main ? <p className="small"><BsWind/>Wind</p> : null}
          </div>
        </div> : null}
      </div>
    </div>
  );
}

export default App;
