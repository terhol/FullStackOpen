import { Part } from "./Part"

export const Content = ({courseParts}) => {
    console.log({courseParts})
return (
    <div>
        {courseParts.map((part) => {return <p key={part.id}>{part.name} {part.exercises}</p>} )}
    </div>
)
}