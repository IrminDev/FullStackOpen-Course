import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom/client'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [phone, setPhone] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(resp => {
      setPersons(resp.data)
    })
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: phone,
      id: persons.length + 1
    }
    if(persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return;
    } else {
      if(persons.find(person => person.phone === phone)) {
        alert(`${phone} is already added to phonebook`)
        return;
      } else {
        setPersons(persons.concat(personObject));
      }
    }
  }

  const handlePersonChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h1>Add a new</h1>
      <PersonForm handlePersonChange={handlePersonChange} handlePhoneChange={handlePhoneChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);