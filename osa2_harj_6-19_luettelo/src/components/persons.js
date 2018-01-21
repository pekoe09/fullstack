import React from 'react'
import Header from './header'
import Person from './person'

const Persons = ({ persons }) => (
  <div>
    <Header level={2} text="Numerot" />
    <table>
      <tbody>
        {persons.map(person => <Person key={person.name} person={person} />)}
      </tbody>
    </table>
  </div>
)

export default Persons