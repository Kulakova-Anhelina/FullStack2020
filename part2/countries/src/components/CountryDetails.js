
import React from 'react'
import Weather from  './Weather';
import '../App.css';

const CountryDetails = ({ countries }) => {
  console.log(countries)
  return countries.map(country => (
    <div key={country.alpha3Code}>
      <h1>{country.name}</h1>
      <p>population: {country.population}</p>
      <p>capital: {country.capital}</p>
      <h2>Languages:</h2>
      {
        country.languages.map((lan, index) => <p key={index}>{lan.name}</p>)
      }
      <img style={{width: "200px"}} src={country.flag} alt="flag" />
      <Weather capital={country.capital}/>
    </div>
  ))
}

export default CountryDetails;
