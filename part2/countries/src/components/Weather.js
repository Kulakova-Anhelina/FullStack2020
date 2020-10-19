import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({})
  console.log(capital, "weather")
  const api_key = process.env.REACT_APP_API_KEY
  console.log(api_key, "key")
  useEffect(() => {
    console.log('effect')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data.current)


      })


  }

    , [api_key,capital])

  console.log(weather, "weather")

  return (
    <div>
      <h1>Weather in {capital}</h1>
      <p>temperature: {weather.temperature} </p>
      <img src={weather.weather_icons} alt="weather" />
      <p>wind :{weather.wind_speed} </p>
    </div>
  )
}



export default Weather;