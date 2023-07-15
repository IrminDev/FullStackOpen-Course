import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdoteFor } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(addAnecdoteFor(content))
        event.target.anecdote.value = ''
    }
    
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm