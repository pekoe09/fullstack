import React from 'react'
import personService from './services/persons'

import Header from './components/header'
import Input from './components/input'
import AddPerson from './components/addPerson'
import Persons from './components/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    let current = this.state.persons.find(person => person.name === this.state.newName)
    if (current) {
      if (window.confirm(this.state.newName + " on jo luettelossa, korvataanko vanha numero uudella?")) {
        newPerson.id = current.id
        personService
          .update(current.id, newPerson)
          .then(response => {
            
            this.setState({
              persons: this.state.persons.map(person => person.id === current.id ? newPerson : person)
            })
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response),
            newName: '',
            newNumber: ''
          })
        })
    }
  }

  deletePerson = (id) => {
    return () => {
      let candidate = this.state.persons.find(person => person.id === id)
      if (candidate && window.confirm("poistetaanko " + candidate.name)) {
        personService
          .remove(id)
          .then(() => {
            this.setState({ persons: this.state.persons.filter(person => person.id !== id) })
          })
      }
    }
  }

  handleNameChange = (name) => {
    this.setState({ newName: name })
  }

  handleNumberChange = (number) => {
    this.setState({ newNumber: number })
  }

  handleFilterChange = (text) => {
    this.setState({ filter: text })
  }

  render() {
    const personsToShow = this.state.persons.filter(person =>
      person.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    return (
      <div>
        <Header level={1} text="Puhelinluettelo" />
        <Input label="rajaa näytettäviä" value={this.state.filter} handleChange={this.handleFilterChange} />
        <AddPerson
          newName={this.state.newName}
          newNumber={this.state.newNumber}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange}
          handleSubmit={this.addPerson}
        />
        <Persons persons={personsToShow} deletePerson={this.deletePerson} />
      </div>
    )
  }
}

export default App