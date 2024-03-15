import { Header } from "./Header"
import { Content } from "./Content"

export const Course = ({course}) => {

    return (
        <div>
        <Header course={course.name}/>
        <Content courseParts={course.parts} />
        </div>
    )
}