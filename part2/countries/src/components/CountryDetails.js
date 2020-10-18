
import React from 'react'


const CountryDetails = ({ countries }) => {
  console.log(countries)
  return countries.map(country => (
    <div>
      <h1>{country.name}</h1>
      <p>population: {country.population}</p>
      <p>capital: {country.capital}</p>
      <h2>Languages:</h2>
      {
        country.languages.map((lan) => lan.name)
      }
      <img src={country.flag} alt="flag" />
    </div>
  ))
}

export default CountryDetails;
