/* eslint-disable react/prop-types */
import {
  addPerson as addPersonService,
  updateNumber as updateNumberService,
} from './services/PersonService'

export const AddContact = ({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  persons,
  setPersons,
  setNotificationMessage,
  setIsError,
}) => {
  const allNames = persons.map((person) => person.name)

  const addPerson = async (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    if (allNames.includes(newName)) {
      updateNumber(newPerson)
    } else {
      const responseData = await addPersonService(newPerson)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          setPersons([...persons, responseData])
          setIsError(false)
          setNotificationMessage(`Added ${responseData.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch((error) => {
          setIsError(true)
          setNotificationMessage(`Error: ${error.response.data.error}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          console.log(error.response.data.error)
        })
      setNewName('')
      setNewNumber('')
    }
  }

  const updateNumber = (newPerson) => {
    if (
      window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one?`,
      )
    ) {
      const personToChange = persons.find((person) => person.name === newPerson.name)
      const updatedPerson = { ...personToChange, number: newNumber }
      updateNumberService(personToChange.id, updatedPerson)
        .then((responseData) =>
          setPersons(
            persons.map((person) => (person.id !== responseData.id ? person : responseData)),
          ),
        )
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          setIsError(true)
          setNotificationMessage(
            `Information of ${updatedPerson.name} has already been removed from server.`,
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })

      setIsError(false)
      setNotificationMessage(`Changed number for ${updatedPerson.name}.`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
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
