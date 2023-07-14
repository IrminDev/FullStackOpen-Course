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
});
