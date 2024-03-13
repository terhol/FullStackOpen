import { Part } from "./Part"

export const Content = ({courseParts}) => {
    console.log({courseParts})
return (
    <div>
        <Part courseName={courseParts[0].name} exNumber={courseParts[0].exercises} />
        <Part courseName={courseParts[1].name} exNumber={courseParts[1].exercises} />
        <Part courseName={courseParts[2].name} exNumber={courseParts[2].exercises} />
         </div>
)
}