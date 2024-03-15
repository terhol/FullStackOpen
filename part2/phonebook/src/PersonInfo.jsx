export const PersonInfo = ({persons}) => {

    return (
        <div>
            {persons.map((person) => <p key={person.name}>{person.name}</p>)}
        </div>
    )
}