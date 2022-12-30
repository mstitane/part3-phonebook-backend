require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('./models/person')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.get('/hello', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        response.send(`<div> <p>Phonebook has info for ${persons.length} people</p> <p> ${new Date()}</p> </div>`)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person)
            response.json(person)
        else
            response.status(404).end()
    }).catch(error => next(error))
})
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(person => {
        response.status(204).end()
    }).catch(error => next(error))
})
app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if (!body || !body.name || !body.number) {
        return response.status(400).json({
            error: 'The name or number is missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(obj => {
        response.json(obj)
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updated => {
            response.json(updated)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }

    next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})