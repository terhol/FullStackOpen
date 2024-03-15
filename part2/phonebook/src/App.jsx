import { useState } from 'react'
import { PersonInfo } from './PersonInfo'


function App() {
 const [persons, setPersons] = useState([{name: 'Arto Hellas'}])
 const [newName, setNewName] = useState('')

 const allNames = persons.map(person => person.name)

 const addPerson = (event) => {
  event.preventDefault()
  const newPerson = {name: newName}
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
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={(event) => {setNewName(event.target.value)}}/>
      </div>
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
    <h2>Numbers</h2>
    <PersonInfo persons={persons} />
  </div>
 )
}

export default App
