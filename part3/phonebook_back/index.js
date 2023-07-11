/* eslint-disable no-unused-vars */
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Person = require('./models/person')

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}

	next(error)
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', function(req, res) {
	return JSON.stringify(req.body)
})

let persons = []

app.get('/api/persons', (req, res) => {
	persons = []
	Person.find({}).then(result => {
		result.forEach(person => {
			persons = persons.concat(person)
		})
		res.json(persons)
	})
})

app.get('/info', (req, res) => {
	res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id).then(person => {
		if (person) {
			response.json(person)
		} else {
			response.status(404).end()
		}
	}).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id).then(result => {
		response.status(204).end()
	}).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body
	const person = {
		name: body.name,
		number: body.number,
	}
	Person.findByIdAndUpdate(request.params.id, person, { new: true })
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
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
	}).catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})