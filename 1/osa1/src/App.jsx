import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad, total, average, posPercentage } = props

  if (total === 0) {
    return <p>Ei palautetta annettu</p>
  }

  return (
    <div>
      <h2>Palautteet</h2>
      <StatisticLine text="Hyvä" value={good} />
      <StatisticLine text="Neutraali" value={neutral} />
      <StatisticLine text="Huono" value={bad} />
      <StatisticLine text="Kaikki" value={total} />
      <StatisticLine text="Keskiarvo" value={average.toFixed(1)} />
      <StatisticLine text="Positiivisia" value={`${posPercentage}%`} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const average = total === 0 ? 0 : (good - bad) / total
  const posPercentage = total === 0 ? 0 : (good / total) * 100

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
        <Button handleClick={handleGood} text="Hyvä" />
        <Button handleClick={handleNeutral} text="Neutraali" />
        <Button handleClick={handleBad} text="Huono" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} 
        total={total} average={average} posPercentage={posPercentage}/>
    </div>
  )
}

export default App
