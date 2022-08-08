import React, {useState} from 'react'
import axios from 'axios'
import CountUp from 'react-countup';
import Moment from 'react-moment';

import {AiOutlineClockCircle} from 'react-icons/ai';
import { BsWind, BsCloudRain, BsCloudDrizzle, BsCloudSnow, BsCloudFog2 } from 'react-icons/bs';
import { FiDroplet, FiSunrise, FiSunset} from 'react-icons/fi';
import { TbTemperature,TbCloudStorm, TbMist, TbTornado } from 'react-icons/tb';
import {MdOutlineWbSunny, MdOutlineWbCloudy} from 'react-icons/md';

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [imgUrl,setImgUrl] = useState([]);

  const AXIOS_KEY = process.env.REACT_APP_AXIOS_KEY;
  const USPLA_KEY = process.env.REACT_APP_USPLA_KEY;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${AXIOS_KEY}`)
      .then((response) => {
        setData(response.data)
      })
      axios.get(`https://api.unsplash.com/search/photos?page=1&query=${location}&client_id=${USPLA_KEY}`)
      .then((background) => {
        setImgUrl(background.data.results[5].urls.regular)
      })
    setLocation('')
    }
  }

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
            { data.weather[0].main === "Clear" ? <p className="weather-icon"><MdOutlineWbSunny /></p> : null }
            { data.weather[0].main === "Clouds" ? <p className="weather-icon"><MdOutlineWbCloudy /></p> : null }
            { data.weather[0].main === "Drizzle" ? <p className="weather-icon"><BsCloudRain /></p> : null }
            { data.weather[0].main === "Fog" ? <p className="weather-icon"><BsCloudFog2 /></p> : null }
            { data.weather[0].main === "Mist" ? <p className="weather-icon"><TbMist /></p> : null }
            { data.weather[0].main === "Rain" ? <p className="weather-icon"><BsCloudDrizzle /></p> : null }
            { data.weather[0].main === "Snow" ? <p className="weather-icon"><BsCloudSnow /></p> : null }
            { data.weather[0].main === "Thunderstorm" ? <p className="weather-icon"><TbCloudStorm /></p> : null }
            { data.weather[0].main === "Tornado" ? <p className="weather-icon"><TbTornado /></p> : null }
            </div> : null}
          </div>
        </div>
        {data.main ?
          <div className="timebox">
            <div className="sunrise">
              {data.main ? <p className="bold"><Moment unix format="HH:mm">{data.sys.sunrise}</Moment></p> : null}
              {data.main ? <p className="small"><FiSunrise />Sunrise</p> : null}
            </div>
            <div className="time">

              {data.main ? <p className="bold"><Moment unix format="HH:mm">{data.dt}</Moment></p> : null}
              {data.main ? <p className="small"><AiOutlineClockCircle />Time</p> : null}
            </div>
            <div className="sunset">
              {data.main ? <p className="bold"><Moment unix format="HH:mm">{data.sys.sunset}</Moment></p> : null}
              {data.main ? <p className="small"><FiSunset />Sunset</p> : null}
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
{result.map((photo) => (
  <img src={photo.urls.small} alt="City"/>
))}
*/

/*
{data.main ? <img src={result[0].urls.small} alt="City"/> : null}
*/
