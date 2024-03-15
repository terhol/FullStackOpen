import { Header } from "./Header"
import { Content } from "./Content"
import { Total } from "./Total"

export const Course = ({course}) => {

    return (
        <div>
        <Header course={course.name}/>
        <Content courseParts={course.parts} />
        <Total courseParts={course.parts} />
        </div>
    )
}