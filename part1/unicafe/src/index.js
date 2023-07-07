import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = (props) => {
  return (
    <>
      <h1>statistics</h1>
      {props.stats.total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <div>
          <StatisticLine text="good" value={props.stats.good} />
          <StatisticLine text="neutral" value={props.stats.neutral} />
          <StatisticLine text="bad" value={props.stats.bad} />
          <StatisticLine text="all" value={props.stats.total} />
          <StatisticLine text="average" value={props.stats.average} />
          <StatisticLine text="positive" value={props.stats.positive + " %"} />
        </div>
      )}
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let total = good + bad + neutral
  let average = (good - bad) / total
  let positive = good / total * 100
  let stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: total,
    average: average,
    positive: positive
  }
  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <Statistics stats={stats} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);