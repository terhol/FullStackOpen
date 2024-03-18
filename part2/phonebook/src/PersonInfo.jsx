export const PersonInfo = ({ persons, filteredWord }) => {
  const personsToShow =
    filteredWord === ''
      ? persons
      : persons.filter((person) => person.name.toLowerCase().includes(filteredWord.toLowerCase()))

  return (
    <div>
      {/* TODO: personsToShow.map(({ name, number }) => ( */}
      {personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}
