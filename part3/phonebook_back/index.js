const express = require('express')
const app = express()

let persons = [
    {
        id: 1,
        name: "Irmin Hernandez",
        number: "55-47762643",
    },
    {
        id: 2,
        name: "Irmin Jimenez",
        number: "55-47572824",
    },
    {
        id: 3,
        name: "Ana Hernandez",
        number: "55-23456512",
    },
    {
        id: 4,
        name: "Ana Jimenez",
        number: "55-45761345",
    },
      
]

app.use(express.json())

app.get('/api/persons', (req, res) => {
    res.json(persons)
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
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
  
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 1000),
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})