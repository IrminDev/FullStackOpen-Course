import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import axios from 'axios'
import ReactDOM from 'react-dom/client'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [phone, setPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault();
    if(newName === '' || phone === '') {
      alert('Please fill in all fields')
      return;
    }
    const personObject = {
      name: newName,
      number: phone,
    }
    if(persons.find(person => person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        axios.put(`https://persons-api.onrender.com/api/persons/${person.id}`, personObject)
        .then(resp => {
          setNewName('')
          setPhone('')
          setMessage(`${person.name} number's changed to ${phone}`)
          setType('notification')
          setTimeout(() => {
              setMessage('')
              setType('')
          }, 5000)
        })
        .catch(error => {
          setMessage(`${person.name} was already removed from server`)
          setType('error')
          setTimeout(() => {
              setMessage('')
              setType('')
          }, 5000)
        })
        return;
      }
      return;
    } else {
      if(persons.find(person => person.phone === phone)) {
        if(window.confirm(`${newName} is already added to phonebook, replace the old name with a new one?`)) {
          const person = persons.find(person => person.number === phone)
          updatePerson(person.id, personObject)
          .then(resp => {
            setNewName('')
            setPhone('')
            setMessage(`${phone} owner changed to ${personObject.name}`)
            setType('notification')
            setTimeout(() => {
                setMessage('')
                setType('')
            }, 5000)
            return;
          })
        }
      } else {
        personService
          .create(personObject)
          .then(p => {
            setPersons(persons.concat(p))
            setNewName('')
            setPhone('')
            setMessage(`Added ${p.name}`)
            setType('notification')
            setTimeout(() => {
              setMessage('')
              setType('')
            }, 5000)
          })
      }
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const updatePerson = (id, personObject) => {
    personService
      .update(id, personObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
  }

  const handlePersonChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }

  return (
    <div>
      <Notification message={message} type={type} />
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h1>Add a new</h1>
      <PersonForm handlePersonChange={handlePersonChange} handlePhoneChange={handlePhoneChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);