import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const setToVotes = (selected) => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected].anecdote}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => setSelected(getRandomInt(anecdotes.length))}>next anecdote</button>
      <button onClick={() => setToVotes(selected)}>Vote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[votes.indexOf(Math.max(...votes))].anecdote}</p>
      <p>has {votes[votes.indexOf(Math.max(...votes))]} votes</p>
    </div>
  )
}

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))

const anecdotes = [
  {anecdote: 'If it hurts, do it more often', votes: 0},
  {anecdote: 'Adding manpower to a late software project makes it later!', votes: 0},
  {anecdote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
  {anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
  {anecdote: 'Premature optimization is the root of all evil.', votes: 0},
  {anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0}
]

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);