import React from 'react';
import StatisticLine from '../statisticLine/StatisticLine';

const Statistic = ({good, bad, neutral}) => {
    const all = good + bad + neutral
    if (all === 0) {
        return <p>No feedback given</p>
    }
    const average = (good - bad) / all
    const positive = (good / all) * 100

    return(
    <table>
        <tbody>
        <tr>
        <td>
        <h1>Statistics</h1>
        </td>
        </tr>
        <StatisticLine text="good" value={good}></StatisticLine>
        <StatisticLine text="neutral" value={neutral}></StatisticLine>
        <StatisticLine text="bad" value={bad}></StatisticLine>
        <StatisticLine text="all" value={all}></StatisticLine>
        <StatisticLine text="average" value={average}></StatisticLine>
        <StatisticLine text="positive" value={positive}></StatisticLine>
        </tbody>
    </table>
    )
}

export default Statistic;