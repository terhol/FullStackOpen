import { deletePerson as deletePersonService } from './services/PersonService'

export const PersonInfo = ({ persons, setPersons, filteredWord }) => {
  const personsToShow =
    filteredWord === ''
      ? persons
      : persons.filter((person) => person.name.toLowerCase().includes(filteredWord.toLowerCase()))

  const deletePerson = (deleteId, deletedName) => {
    if (window.confirm(`Delete ${deletedName}?`)) {
      deletePersonService(deleteId).then(() => {
        const updatedPersons = persons.filter(({ id }) => id !== deleteId)
        setPersons(updatedPersons)
      })
    }
  }

  return (
    <div>
      {personsToShow.map(({ name, number, id }) => (
        <p key={name}>
          {name} {number}
          <button
            onClick={() => {
              deletePerson(id, name)
            }}
          >
            {' '}
            Delete{' '}
          </button>
        </p>
      ))}
    </div>
  )
}
