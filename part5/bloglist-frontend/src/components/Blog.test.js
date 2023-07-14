import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Blog from "./Blog";

describe('<Blog />', () => {
    let component
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Test Author',
        url: 'http://localhost:3000',
        likes: 0
    }
    beforeEach(() => {
        component = render(
            <Blog blog={blog} />
        )
    })
    
    test('renders content', () => {
        const element = component.getByText(
            'Component testing is done with react-testing-library Test Author'
          )
        expect(element).toBeDefined()
    })
    
    test('clicking the button calls event handler once', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        const element = component.getByText('http://localhost:3000')
        expect(element).toBeDefined()

        const element2 = component.getByText('0')
        expect(element2).toBeDefined()
    })
})

test('clicking the button twice calls event handler twice', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Test Author',
        url: 'http://localhost:3000',
        likes: 0,
        user: {
            username: 'test',
            name: 'test',
            id: '123'
        }
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} handleLike={mockHandler}/>
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const button2 = component.getByText('like')
    fireEvent.click(button2)
    fireEvent.click(button2)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
