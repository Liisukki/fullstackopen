import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [total, setTotal] = useState(0)
  const average = total === 0 ? 0 : (good - bad) / total
  const posPercentage = total === 0 ? 0 : (good / total ) * 100

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
      <h2>Palautteet</h2>
      <p>Hyvä: {good}</p>
      <p>Neutraali: {neutral}</p>
      <p>Huono: {bad}</p>
      <p>Kaikki: {total}</p>
      <p>Keskiarvo: {average}</p>
      <p>Positiivisia: {posPercentage}%</p>
    </div>
  )
}

export default App
