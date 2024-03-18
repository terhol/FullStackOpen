import { useState, useEffect } from 'react'
import { PersonInfo } from './PersonInfo'
import { Filter } from './Filter'
import { AddContact } from './AddContact'
import axios from 'axios'

function App() {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredWord, setFilteredWord] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
    })
  }, [])

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
