export const Total = ({courseParts}) => {
    return (
        <>
        <p>Number of exercises {courseParts[0].exercises + courseParts[1].exercises + courseParts[2].exercises} </p>
        </>
    )
}