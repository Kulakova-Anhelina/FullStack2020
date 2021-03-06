import React from "react";

const CountryList = ({ handleClick, countries }) => {
  console.log(countries)
  return countries.map(country => (
    <div key={country.alpha2Code}>
      {country.name}
      <button onClick={() => handleClick(country.name)}>Show</button>
    </div>
  ));
};
export default CountryList;