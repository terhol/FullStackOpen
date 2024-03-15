export const PersonInfo = ({persons,filteredWord}) => {

    const personsToShow = filteredWord === '' ? persons : persons.filter((person) => (person.name).toLowerCase().includes(filteredWord.toLowerCase()))

    
    return (
        <div>
            {personsToShow.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
    )
}