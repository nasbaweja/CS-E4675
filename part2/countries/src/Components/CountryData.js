import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CountryData = (props) =>{
    let country = props.country;
    const api_key = process.env.REACT_APP_API_KEY;
    const [weatherData, setWeatherData] = useState('')
    const [windData, setWindData] = useState('')
    const [iconData, setIconData] = useState('')

    const hook = () => {
        axios
          .get('https://api.openweathermap.org/data/2.5/weather?lat='+country.capitalInfo.latlng[0]+'&lon='+country.capitalInfo.latlng[1]+'&appid='+api_key+'&units=metric')
          .then(response => {
            setWeatherData(response.data.main.temp)
            setWindData(response.data.wind.speed)
            setIconData(response.data.weather[0].icon)
          })
      }
    
    useEffect(hook, [])

    return(
        <div key={country.name.common}>
                        <h2>{country.name.common}</h2>
                        <div>
                            Capital: {country.capital[0]}
                        </div>
                        <div>
                            Area: {country.area}
                        </div>
                        <div>
                            Languages:
                            <div>
                                <ul>
                                    {Object.values(country.languages).map((lang)=>(
                                        <li key={lang}>
                                            {lang}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <img src={country.flags.png} alt="Some Flag" />
                        </div>
                        <div>
                            <h2>Weather in {country.capital[0]}</h2>
                        </div>
                        <div>
                            Temperature: {weatherData}
                        </div>
                        <div>
                            <img src={'http://openweathermap.org/img/wn/'+iconData+'.png'} alt="img" />
                        </div>
                        <div>
                            Wind: {windData}
                        </div>
                    </div>
    )
}

export default CountryData