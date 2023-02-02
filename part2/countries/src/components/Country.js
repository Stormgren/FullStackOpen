import axios from "axios"
import { useState, useEffect } from "react"

const Country = ({ details }) => {

    const [weather, setWeather] = useState(false)

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${details.capital[0].toLowerCase()}&appid=${api_key}&&units=metric`
        axios.get(url).then(res => setWeather(res.data))
    }, [details])
    
    return(
        <div>
            <h1>{details.name.common}</h1>
            <h3>{details.name.official}</h3>
            <p>Capital: {details.capital}</p>
            <p>Area: {details.area}</p>
            <p>Languages: </p>
            <ul>
            {Object.keys(details.languages).map((value, index) => {
            return (
            <li key={value}>{value}</li>
            )}
            )}
            </ul>
            <img src={details.flags.png} alt={details.flags.alt} />
            <h3>Weather in {details.capital[0]}</h3>         
           {weather &&    
           <>
           <h3>Temperature: {weather.main.temp} celsius</h3>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main}/>
            <p>{weather.weather[0].main}</p>
            <h3>Wind: {weather.wind.speed} m/s</h3> 
            </>
            }
        </div>    
    )
}

export default Country
