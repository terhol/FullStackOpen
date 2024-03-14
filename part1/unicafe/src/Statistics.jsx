export const Statistics = ({good, neutral, bad}) => {

    const total = good + neutral + bad
    const averageScore = (good - bad) / total
    const positiveFeedback = (good / total) * 100

    if(total === 0){
        return (
            <div>No feedback given</div>
        )
    }
    
    return (
        <>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {total>0 ? averageScore : 0}</p>
        <p>positive {total>0 ? positiveFeedback : 0} %</p>
        </>
    )
}