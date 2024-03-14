import { StatisticLine } from "./StatisticLine"

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
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={total}/>
        <StatisticLine text="average" value={total>0 ? averageScore : 0}/>
        <StatisticLine text="positive" value={total>0 ? positiveFeedback + '%' : 0}/>

        </>
    )
}