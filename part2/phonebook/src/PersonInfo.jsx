export const PersonInfo = ({ persons, filteredWord }) => {
  const personsToShow =
    filteredWord === ''
      ? persons
      : persons.filter((person) => person.name.toLowerCase().includes(filteredWord.toLowerCase()))

  return (
    <div>
      {personsToShow.map(({ name, number }) => (
        <p key={name}>
          {name} {number}
        </p>
      ))}
    </div>
  )
}
