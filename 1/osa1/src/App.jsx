import { useState, useEffect } from 'react';
import personService from './services/persons';

const Filter = ({ filterText, handleFiltering }) => (
  <div>
    Filter shown with: <input value={filterText} onChange={handleFiltering} />
  </div>
)

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => (
  <form onSubmit={addPerson}>
    <div>
      Name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      Number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ persons }) => (
  <ul>
    {persons.map(person => (
      <li key={person.id}>
        {person.name} {person.number}
      </li>
    ))}
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  // Haetaan tiedot palvelimelta
  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleFiltering = event => {
    setFilterText(event.target.value)
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const addPerson = event => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    personService.create(newPerson).then(addedPerson => {
      setPersons(persons.concat(addedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter filterText={filterText} handleFiltering={handleFiltering} />

      <h2>Add a new</h2>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>

      <Persons persons={personsToShow} />
    </div>
  )
}

export default App;
