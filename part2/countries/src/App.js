
import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import CountryDetails from './components/CountryDetails'
import CountryList from './components/CountryList'


const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
 const countriesFiltered = countries.filter(country => (country.name.toLowerCase().includes(search.toLowerCase())))
  const moreThanTen = countriesFiltered.length > 10;
  const lessThanTen = countriesFiltered.length < 10 && countriesFiltered.length >= 2;
  const oneCountry = countriesFiltered.length === 1

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
    , [countries.length])




  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }



  const handleClick = (name) => {
    setSearch(name)

  }


  return (
    <div className="App">
      Find countries
      <p> <input
        value={search}
        onChange={handleSearch}
      /></p>
      {moreThanTen && <p>Too many matches, specify another filte</p>}
      {lessThanTen &&
        <CountryList countries={countriesFiltered} handleClick={handleClick} />}

      {oneCountry &&
        <CountryDetails countries={countriesFiltered} />}
    </div>
  );
}

export default App;
