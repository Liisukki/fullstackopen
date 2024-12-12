import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [showInfo, setShowInfo] = useState({}) // Tämän avulla hallitaan, mitkä maat näyttävät tarkempia tietoja

  useEffect(() => {
    if (query) {
      axios
        .get(`https://restcountries.com/v3.1/name/${query}`)
        .then(response => {
          setCountries(response.data)
          setErrorMessage(null) // Tyhjennetään virheilmoitus, jos löytyy maita
        })
        .catch(error => {
          setErrorMessage('No countries found matching your query')
          setCountries([]) // Tyhjennetään maat, jos virhe
        })
    } else {
      setCountries([])
      setErrorMessage(null) // Tyhjennetään virheilmoitus, jos hakukenttä tyhjä
    }
  }, [query])

  const handleQueryChange = event => {
    setQuery(event.target.value)
  }

  const handleShowInfo = countryCode => {
    setShowInfo(prevState => ({
      ...prevState,
      [countryCode]: !prevState[countryCode]
    }))
  }

  const renderCountries = () => {
    // Jos tuloksia on enemmän kuin 1
    if (countries.length > 10) {
      return <div>Too many matches, please refine your search</div>
    }
    if (countries.length > 1) {
      return countries.map(country => (
        // Lisää nappi lisätiedoille
        <div key={country.cca3}>
          {country.name.common}{' '}
          <button onClick={() => handleShowInfo(country.cca3)}>Show</button> 
          {showInfo[country.cca3] && (
            <div>
              <h2>{country.name.common}</h2>
              <img src={country.flags[0]} alt={`${country.name.common} flag`} width="100" />
              <p>Capital: {country.capital}</p>
              <p>Area: {country.area} km²</p>
              <p>Languages: {Object.values(country.languages).join(', ')}</p>
            </div>
          )}
        </div>
      ))
    }
    // Jos vastaavia tuloksia on vain 1
    if (countries.length === 1) {
      const country = countries[0]
      return (
        <div>
          <h2>{country.name.common}</h2>
          <img src={country.flags[0]} alt={`${country.name.common} flag`} width="100" />
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area} km²</p>
          <p>Languages: {Object.values(country.languages).join(', ')}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div>
      <h1>Country Information Search</h1>
      <input
        type="text"
        placeholder="Search for a country"
        value={query}
        onChange={handleQueryChange}
      />
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>} {/* Näytetään virheilmoitus */}
      {renderCountries()}
    </div>
  )
}

export default App
