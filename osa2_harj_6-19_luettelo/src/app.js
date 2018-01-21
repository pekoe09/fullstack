import React from 'react';
import Header from './components/header'
import Input from './components/input'
import AddPerson from './components/addPerson'
import Persons from './components/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {
          name: 'Arto Hellas',
          number: '040-123456'
        }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    if (this.state.persons.find(person => person.name === this.state.newName)) {
      alert(this.state.newName + " on jo luettelossa!")
    } else {
      const newPerson = {
        name: this.state.newName,
        number: this.state.newNumber
      }
      const newPersons = this.state.persons.concat(newPerson)
      this.setState({
        persons: newPersons,
        newName: '',
        newNumber: ''
      })
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
        <Persons persons={personsToShow} />
      </div>
    )
  }
}

export default App