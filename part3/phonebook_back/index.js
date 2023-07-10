require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', function(req, res) {
    return JSON.stringify(req.body);
});

let persons = []

app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        result.forEach(person => {
            persons = persons.concat(person)
        })
        res.json(persons)
        mongoose.connection.close()
    })
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(result => {
        response.status(204).end()
    }).catch(error => {
        console.log(error)
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({ 
        error: 'name missing' 
        })
    }

    if (!body.number) {
        return response.status(400).json({ 
        error: 'number missing' 
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        response.json(result)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})