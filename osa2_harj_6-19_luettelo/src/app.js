import React from 'react'
import personService from './services/persons'
import './index.css'

import Header from './components/header'
import Input from './components/input'
import AddPerson from './components/addPerson'
import Persons from './components/persons'
import Notification from './components/notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: null
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
              persons: this.state.persons.map(person => person.id === current.id ? newPerson : person),
              message: "Puhelinnumero henkilölle " + newPerson.name + " päivitetty"
            })
            setTimeout(() => {
              this.setState({ message: null })
            }, 5000)
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response),
            newName: '',
            newNumber: '',
            message: "Lisättiin " + newPerson.name
          })
          setTimeout(() => {
            this.setState({ message: null })
          }, 5000)
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
            this.setState({
              persons: this.state.persons.filter(person => person.id !== id),
              message: "Poistettiin " + candidate.name
            })
            setTimeout(() => {
              this.setState({ message: null })
            }, 5000)
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
        <Notification message={this.state.message} />
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