export const PersonList = ({persons}) => {

    return (
        <div>
            {persons.map((person) => <p>{person.name}</p>)}
        </div>
    )
}