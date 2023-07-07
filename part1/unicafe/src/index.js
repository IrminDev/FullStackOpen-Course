import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'


const Statistics = (props) => {
  return (
    <>
      <h1>statistics</h1>
      <div>
        <p>good {props.stats.good}</p>
        <p>neutral {props.stats.neutral}</p>
        <p>bad {props.stats.bad}</p>
        <p>all {props.stats.total}</p>
        <p>average {props.stats.average}</p>
        <p>positive {props.stats.positive} %</p>
      </div>
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