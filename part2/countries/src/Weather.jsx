import axios from 'axios'
import { useState, useEffect } from 'react'

const getForecast = async ({ city }) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  const weatherForecastURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

  const response = await axios.get(weatherForecastURL)
  return response.data
}

const Weather = ({ city }) => {
  const [forecast, setForecast] = useState(undefined)

  useEffect(() => {
    getForecast({ city }).then((data) => setForecast(data))
  }, [city])

  if (forecast === undefined) {
    return <div>Loading forecast...</div>
  }
  return (
    <>
      <h2>Weather in {city}</h2>
      <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} />
      <p>Temperature {forecast.main.temp} Celsius</p>
      <p>Wind {forecast.wind.speed}</p>
    </>
  )
}

export { Weather }
