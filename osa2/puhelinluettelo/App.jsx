const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterText, setFilterText] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const handleFiltering = event => {
    setFilterText(event.target.value);
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const addPerson = event => {
    event.preventDefault();
  
    const existingPerson = persons.find(person => person.name === newName);
  
    if (existingPerson) {
      // Jos nimi löytyy jo, kysytään vahvistus numeron päivittämisestä
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };
  
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            if (error.message === "Person has already been removed") {
              setErrorMessage(`Information of ${newName} has already been removed`);
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            } else {
              alert(`The contact '${existingPerson.name}' was already removed from the server.`);
              setPersons(persons.filter(person => person.id !== existingPerson.id));
            }
          });
      }
      return;
    }
  
    const newPerson = { name: newName, number: newNumber };
  
    personService.create(newPerson).then(addedPerson => {
      setPersons(persons.concat(addedPerson));
      setNewName('');
      setNewNumber('');
    });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          alert(`The contact '${name}' was already removed from the server.`);
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  };

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
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
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;