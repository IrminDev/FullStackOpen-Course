import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      phoneNumber: '040-1234567',
      id: 1
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [phone, setPhone] = useState('')
  const [filter, setFilter] = useState('')

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      phoneNumber: phone,
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
      <input onChange={handleFilterChange} />
      <h1>Add a new</h1>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handlePersonChange} />
        </div>
        <div>
          phoneNumber: <input onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => {
        return (
          <div key={person.name}>
            {person.name} {person.phoneNumber}
          </div>
        )
      })}
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);