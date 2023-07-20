import React, { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const AuthorForm = ({authors}) => {
    const [ changeBorn ] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    const [selectedOption, setSelectedOption] = useState(null);
    const [born, setBorn] = useState('')

    const options = authors.map(a => {
        return {value: a.name, label: a.name}
    })

    const submit = async (event) => {
        event.preventDefault()
        changeBorn({ variables: { name: selectedOption.value, born: parseInt(born) } })
        setSelectedOption(null)
        setBorn('')
    }
    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    name
                    <Select
                        value={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                    />
                </div>
                <div>
                    born
                    <input
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    /> 
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default AuthorForm