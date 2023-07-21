import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import HomePage from './components/HomePage'
import { useSubscription, useApolloClient } from '@apollo/client'
import { BOOK_ADDED } from './queries'
import { ALL_BOOKS } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniByTitle = (a) => {
    let seen = new Set();
    return a.filter(item => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    })
  }

  cache.updateQuery(query, ({allBooks}) => {
    return{
      allBooks: uniByTitle(allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const [page, setPage] = useState('home')
  const [token, setToken] = useState('');
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      window.alert(`New book added`)
      console.log(data)
      const addedBook = data.data.bookAdded
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

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
