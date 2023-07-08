import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom/client'

const Country = ({country}) => {
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
          countriesToShow.map(country => <p key={country.name.common}>{country.name.common}</p>)
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