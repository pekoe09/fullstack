import React from 'react'

import Country from './country'

const CountryList = ({ countries, setFilter }) => {

  if (countries.length >= 10) {
    return <div>too many matches, specify another filter</div>
  } else if (countries.length > 1) {
    const list = countries.map(country =>
      <div key={country.name} onClick={setFilter(country.name)}>{country.name}</div>)
    return (
      <div>
        {list}
      </div>
    )
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />
  } else {
    return <div>no matches found, specify another filter</div>
  }
}

export default CountryList