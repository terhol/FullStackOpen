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

let entries = [
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
]

app.get(baseURL, (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  response.set('Content-Type', 'text/html')
  response.send(
    `<div>Phonebook has info for ${entries.length} people.</div><br></br><div>${new Date()}</div>`,
  )
})

app.get(`${baseURL}/:id`, (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person)
    })
    .catch((error) => {
      console.log('Could not find person with id', request.params.id)
    })
})

app.delete(`${baseURL}/:id`, (request, response) => {
  const id = Number(request.params.id)
  entries = entries.filter((entry) => entry.id !== id)

  response.status(204).end()
})

app.post(`${baseURL}`, (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({
      error: 'Content missing',
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then((savedPerson) => {
    response.json(savedPerson)
  })
})
