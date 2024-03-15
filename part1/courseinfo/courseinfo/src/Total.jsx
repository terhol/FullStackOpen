export const Total = ({courseParts}) => {

    const exercisesNumbers = courseParts.map((element) => element.exercises)
 
    const totalNumberOfExercises = exercisesNumbers.reduce((accumulator, currentValue) => currentValue + accumulator)

    return (
        <>
        <p><b>Total of {totalNumberOfExercises} exercises</b></p>
        </>
    )
}