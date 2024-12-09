import { useState } from 'react'

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = total === 0 ? 0 : (props.good - props.bad) / total
  const positivePercentage = total === 0 ? 0 : (props.good / total) * 100

  

  return (
    <div>
      <h2>Palautteet</h2>
      <p>Hyvä: {props.good}</p>
      <p>Neutraali: {props.neutral}</p>
      <p>Huono: {props.bad}</p>
      <p>Kaikki: {total}</p>
      <p>Keskiarvo: {average}</p>
      <p>Positiivisia: {positivePercentage}%</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + good + bad)
  }

  const handleBad = () => {
    const updatedBad = bad + 1 
    setBad(updatedBad)
    setTotal(updatedBad + neutral + good)
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Unicafe Palautesovellus</h1>
      <div>
        <button onClick={handleGood}>Hyvä</button>
        <button onClick={handleNeutral}>Neutraali</button>
        <button onClick={handleBad}>Huono</button>
      </div>
    <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
