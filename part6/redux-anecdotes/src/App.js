import { useSelector, useDispatch } from 'react-redux'
import { voteFor, addAnecdoteFor } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state).toSorted((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteFor(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(addAnecdoteFor(content))
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App