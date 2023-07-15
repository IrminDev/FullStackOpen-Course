import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

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

    const vote = (id) => {
        dispatch(voteFor(id))
    }

    const anecdotes = useSelector(state => state).toSorted((a, b) => b.votes - a.votes)
    return (
        <div>
            {anecdotes.map(anecdote => 
                <Anecdote anecdote={anecdote} handleClick={() => vote(anecdote.id)} />
            )}
        </div>
    )
}

export default AnecdoteList