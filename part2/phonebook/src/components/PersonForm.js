import React from 'react'

const PersonForm = ( {addPerson, handlePersonChange, handlePhoneChange} ) => {
  return (
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
  )
}

export default PersonForm