import React from 'react'
import { useQuery } from '@apollo/client'
import { FAVORITE_BOOKS } from '../queries'

const HomePage = (props) => {
    const result = useQuery(FAVORITE_BOOKS)

    if (!props.show) {
        return null
    }
    
    if(!props.logged){
        return <h2>Login to view your favorite genre</h2>
    }
    
    if (result.loading)  {
        return <div>loading...</div>
    }

    const books = result.data.favoriteBooks

    return (
        <div>
            <h2>Recommendations</h2>
            <p>Books in your favorite genre <strong>patterns</strong></p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                        {books.map((a) => (
                            <tr key={a.title}>
                                <td>{a.title}</td>
                                <td>{a.author.name}</td>
                                <td>{a.published}</td>
                            </tr>
                        ))}
                </tbody>
            </table> 
        </div>
    )
}

export default HomePage