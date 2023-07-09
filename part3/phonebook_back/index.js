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

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})