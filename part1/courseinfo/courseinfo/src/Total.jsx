export const Total = ({courseParts}) => {

    const totalNumberOfExercises = () => {
        let counter = 0
        courseParts.forEach((coursePart) => {counter += coursePart.exercises})
        return counter
    }

    return (
        <>
        <p><b>Total of {totalNumberOfExercises()} exercises</b></p>
        </>
    )
}