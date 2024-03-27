const express = require('express')
const app = express()
app.use(express.json())

const PORT = 3001
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
    number: '39-23-6423122',
  },
]

app.get(baseURL, (request, response) => {
  response.json(entries)
})

app.get('/info', (request, response) => {
  response.set('Content-Type', 'text/html')
  response.send(
    `<div>Phonebook has info for ${entries.length} people.</div><br></br><div>${new Date()}</div>`,
  )
})

app.get(`${baseURL}/:id`, (request, response) => {
  const id = Number(request.params.id)
  const person = entries.find((entry) => entry.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete(`${baseURL}/:id`, (request, response) => {
  const id = Number(request.params.id)
  entries = entries.filter((entry) => entry.id !== id)

  response.status(204).end()
})
