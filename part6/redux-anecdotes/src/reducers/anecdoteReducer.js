import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote(state, action) {
      const votedAnecdote = action.payload
      return state.map(a => a.id !== votedAnecdote.id ? a : votedAnecdote)
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteFor = (id) => {
  return async dispatch => {
    const anecdoteToVote = await anecdoteService.getOne(id)
    const votedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }
    await anecdoteService.update(id, votedAnecdote)
    dispatch(vote(votedAnecdote))
  }
}

export const { vote, add, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer