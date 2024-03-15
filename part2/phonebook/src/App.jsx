import { useState } from 'react'
import { PersonInfo } from './PersonInfo'


function App() {
 const [persons, setPersons] = useState([
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
])
 const [newName, setNewName] = useState('')
 const [newNumber, setNewNumber] = useState('')
 const [filteredWord, setFilteredWord] = useState('')

 const allNames = persons.map(person => person.name)

 const addPerson = (event) => {
  event.preventDefault()
  const newPerson = {name: newName, number: newNumber}
  if(allNames.includes(newName)){
    alert(`${newName} is already added to phonebook.`)
  }
  else {
  setPersons(persons.concat(newPerson))
  }
  setNewName('')
 } 

 return (
  <div>
    <h2>Phonebook</h2>
    Filter shown with <input value={filteredWord} onChange={(event) => {setFilteredWord(event.target.value)}}/>
    <h2>Add new contact</h2>
    <form onSubmit={addPerson}>
      <div>
        <p>Name: <input value={newName} onChange={(event) => {setNewName(event.target.value)}}/></p>
        <p>Number: < input value={newNumber} onChange={(event) => {setNewNumber(event.target.value)}}/></p>
      </div>
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
    <h2>Numbers</h2>
    <PersonInfo persons={persons} filteredWord={filteredWord} />
  </div>
 )
}

export default App
