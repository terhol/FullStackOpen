export const AddContact = ({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  persons,
  setPersons,
}) => {
  const allNames = persons.map((person) => person.name)

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    if (allNames.includes(newName)) {
      alert(`${newName} is already added to phonebook.`)
    } else {
      setPersons([...persons, newPerson])
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
