import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import BlogForm from "./BlogForm";

describe('<BlogForm />', () => {
    test('BlogForm calls the event handler it received as props with the right details when a new blog is called', () => {
        const createBlog = jest.fn()
        const component = render(
            <BlogForm createBlog={createBlog} />
        )

        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')
        const form = component.container.querySelector('form')

        fireEvent.change(title, {
            target: { value: 'Component testing is done with react-testing-library' }
        })
        fireEvent.change(author, {
            target: { value: 'Test Author' }
        })
        fireEvent.change(url, {
            target: { value: 'http://localhost:3000' }
        })
        fireEvent.submit(form)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('Component testing is done with react-testing-library')
        expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
        expect(createBlog.mock.calls[0][0].url).toBe('http://localhost:3000')
    })
})
