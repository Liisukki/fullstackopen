import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Unicafe Palautesovellus</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>Hyvä</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutraali</button>
        <button onClick={() => setBad(bad + 1)}>Huono</button>
      </div>
      <h2>Palautteet</h2>
      <p>Hyvä: {good}</p>
      <p>Neutraali: {neutral}</p>
      <p>Huono: {bad}</p>
    </div>
  )
}

export default App
