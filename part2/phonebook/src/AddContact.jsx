import { addPerson as addPersonService } from './services/PersonService'

export const AddContact = ({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  persons,
  setPersons,
}) => {
  const allNames = persons.map((person) => person.name)

  const addPerson = async (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    if (allNames.includes(newName)) {
      alert(`${newName} is already added to phonebook.`)
    } else {
      const responseData = await addPersonService(newPerson)
      setPersons([...persons, responseData])
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          <p>
            Name:{' '}
            <input
              value={newName}
              onChange={(event) => {
                setNewName(event.target.value)
              }}
            />
          </p>
          <p>
            Number:
            <input
              value={newNumber}
              onChange={(event) => {
                // TODO: try and understand, what is doing onChange={setNewNumber}
                setNewNumber(event.target.value)
              }}
            />
          </p>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  )
}
