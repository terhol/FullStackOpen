export const Anecdote = ({anecdote, anecdotePoints}) => {
    return (
        <>
        {anecdote}
        <p>has {anecdotePoints} votes</p>
        </>
    )
}