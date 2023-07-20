import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE, ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('');
  const result = useQuery(ALL_BOOKS)
  const setBooks = useQuery(BOOKS_BY_GENRE, {variables: {genre: genre},
    fetchPolicy: 'network-only'})

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genres = [...new Set(books.map(b => b.genres).flat())]

  if(setBooks.loading){
    return <div>loading...</div>
  }

  const bookSet = genre === '' ? books : setBooks.data.allBooksByGenre

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookSet.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
    </div>
  )
}

export default Books
