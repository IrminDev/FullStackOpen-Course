import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import HomePage from './components/HomePage'

const App = () => {
  const [page, setPage] = useState('home')
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if(token){
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken('')
    localStorage.clear()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('home')}>home</button>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token === '' ?
        <button onClick={() => setPage('login')}>login</button>
        : <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={logout}>Logout</button>
        </>}
        
      </div>

      <HomePage show={page === 'home'} logged={token} />

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} setToken={setToken} />
    </div>
  )
}

export default App
