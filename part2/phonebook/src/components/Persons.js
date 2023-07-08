import React from 'react'

const Persons = ({ personsToShow }) => {
  return (
    <div>
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

export default Persons