import { useState } from 'react'
import { PersonInfo } from './PersonInfo'
import { Filter } from './Filter'
import { AddContact } from './AddContact'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredWord, setFilteredWord] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filteredWord={filteredWord} setFilteredWord={setFilteredWord} />

      <h3>Add new contact</h3>
      <AddContact
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
      />

      <h3>Numbers</h3>
      <PersonInfo persons={persons} filteredWord={filteredWord} />
    </div>
  )
}

export default App
