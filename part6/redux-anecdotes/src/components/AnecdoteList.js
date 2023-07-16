import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const voteFor = (id) => {
        dispatch(vote(id))
    }

    const anecdotes = useSelector(state => { 
        if(state.filter === '') {
            return state.anecdotes
        }
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    }).toSorted((a, b) => b.votes - a.votes)

    return (
        <div>
            {anecdotes.map(anecdote => 
                <Anecdote anecdote={anecdote} handleClick={() => voteFor(anecdote.id)} />
            )}
        </div>
    )
}

export default AnecdoteList