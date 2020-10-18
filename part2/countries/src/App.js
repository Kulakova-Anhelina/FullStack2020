
import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState('')
  const [search, setSearch] = useState([])
  const [filter, setFilter] = useState([])
  const [all, setAll] = useState([])

  setTimeout(

    useEffect(() => {
      console.log('effect')
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          console.log('promise fulfilled')
          setCountries(response.data)
          console.log(countries.length)
        })





    }
      , []), 3000
  )

  setTimeout(
    useEffect(() => {
      if (filter.length === 0) {
        setAll("Start searching")
      }
      else if (filter.length > 10) {
        setAll("Too many matches, specify another filter")
      }
      else if (filter.length < 10 && filter.length >= 2) {
        setAll(filter.map((name) => <p>{name.name}</p>))
      } else if (filter.length === 1) {
        setAll(filter.map((name, index) =>

          <div key={index}>
            <h1>{name.name}</h1>
            <p>population: {name.population}</p>
            <p>capital: {name.capital}</p>
            <p>population: {name.population}</p>
            <h2>Languages:</h2>
            <ul>
              {name.languages.map((lan, index) => <li key={index}>{lan.name}</li>)}
            </ul>
            <img src={name.flag} alt="flag" />
          </div>))

      }
      console.log("Hello I am here")





    }
      , [filter]), 2000


  )
  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
    setTimeout(setFilter(countries.filter(country => (country.name.toLowerCase().includes(search) === true))), 1000)



  }





  return (
    <div className="App">
      Find countries
      <p> <input
        value={search}
        onChange={handleSearch}
      /></p>
      {all}
    </div>
  );
}

export default App;
