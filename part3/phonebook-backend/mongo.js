const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Needs password as argument!')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://holmtereza:${password}@fullstackopem.jla97qt.mongodb.net/phonebookDB?retryWrites=true&w=majority&appName=FullstackOpem`

mongoose.set('strictQuery', false)
mongoose.connect(url)
const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  newPerson.save().then((result) => {
    console.log(`Added ${newPerson.name} number ${newPerson.number} to phonebook.`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then((result) => {
    console.log('Phonebook:')
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
