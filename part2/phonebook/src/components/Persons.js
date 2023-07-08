import React from 'react'

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
        {personsToShow.map(person => {
            return (
            <div key={person.name}>
                {person.name} {person.number}
                <button onClick={() => deletePerson(person.id)}>delete</button>
            </div>
            )
        })}
    </div>
  )
}

export default Persons