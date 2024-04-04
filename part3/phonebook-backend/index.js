require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(express.json())
app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]',
  ),
)
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))
const Person = require('./models/person')

const PORT = process.env.PORT
const baseURL = '/api/persons'
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

/*let entries = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-642312',
  },
]*/

app.get(baseURL, (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/info', async (request, response) => {
  const peopleCount = await Person.countDocuments()
  console.log(peopleCount)
  response.set('Content-Type', 'text/html')
  response.send(
    `<div>Phonebook has info for ${peopleCount} people.</div><br></br><div>${new Date()}</div>`,
  )
})

app.get(`${baseURL}/:id`, (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

app.delete(`${baseURL}/:id`, (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post(`${baseURL}`, (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.put(`${baseURL}/:id`, (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformated id.' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'TypeError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)
