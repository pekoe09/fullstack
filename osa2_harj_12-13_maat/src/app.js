import React from 'react'
import axios from 'axios'

import CountryList from './components/countrylist'
import Filter from './components/filter'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  setFilter = (newFilter) => {
    return () => {
      this.setState({ filter: newFilter })
    }
  }

  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  render() {
    const countriesToShow = this.state.countries.filter(country =>
      country.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    return (
      <div>
        <Filter filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
        <CountryList countries={countriesToShow} setFilter={this.setFilter} />
      </div>
    )
  }
}

export default App