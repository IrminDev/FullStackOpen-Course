import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

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

    const voteFun = (id) => {
        dispatch(voteFor(id))
        dispatch(setNotification(`you voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
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
                <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => voteFun(anecdote.id)} />
            )}
        </div>
    )
}

export default AnecdoteList