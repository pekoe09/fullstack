import React from 'react'

const Country = ({ country }) => {
  const flagStyle = {
    maxHeight: 200
  }
  return (
    <div>
      <h1>{country.name} {country.nativeName}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <img src={country.flag} alt={`Flag of ${country.name}`} style={flagStyle} />
    </div>
  )
}

export default Country