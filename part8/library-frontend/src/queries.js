import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query{
        allBooks {
            title
            genres
            published
            author {
                name
            }
        }
    }
`

export const ADD_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            title
            published
            genres
            author {
                name
            }
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $born: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $born
        ) {
            name
            born
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(
            username: $username,
            password: $password
        ){
            value
        }
    }
`

export const FAVORITE_BOOKS = gql`
    query favoriteBooks {
        favoriteBooks {
            title
            published
            author {
                name
            }
        }
    }
`

export const BOOKS_BY_GENRE = gql`
    query allBooksByGenre($genre: String!) {
        allBooksByGenre(genre: $genre) {
            title
            published
            author {
                name
            }
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            title
            published
            author {
                name
            }
            genres
        }
    }
`