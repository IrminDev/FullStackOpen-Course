import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({course}) => {
    return (
        <div>
            <h1>Web development curriculum</h1>
            {course.map(course => {
                return (
                    <div key={course.id}>
                        <Header name={course.name} />
                        <Content parts={course.parts} />
                        <Total total={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
                    </div>
                )
            })}
        </div>
    )
}

export default Course