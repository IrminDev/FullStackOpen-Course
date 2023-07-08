import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom/client'

const api_key = process.env.REACT_APP_API_KEY

const Country = ({country}) => {
  const [ weather, setWeather ] = useState({})

  // The API doesn't let me access, always throw the error 105
  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
    .then((response) => {
      setWeather(response.data)
      console.log(response.data)
    })
  }, [])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} width="200" height="200" />
      <h2>Weather in {country.capital}</h2>
      <p>temperature: {weather.current.temperature} Celcius</p>
      <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} />
      <p>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
        Find countries <input onChange={handleFilterChange} />
        { countriesToShow.length > 10 ? 
          <p>Too many matches, specify another filter</p> :
          countriesToShow.length === 1 ?
          <Country country={countriesToShow[0]} /> :
          countriesToShow.map(country => {
            return (
              <div key={country.name.common}>
                {country.name.common}
                <button onClick={() => setFilter(country.name.common)}>show</button>
              </div>
            )
          })
        }
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);