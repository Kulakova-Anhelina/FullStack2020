import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [phone, setPhone] = useState('')
  const [search, setSearch] = useState([])
  const [filter, setFilter] = useState([])
  const allNames = persons.map((person) => person.name.toLowerCase())

  const addPerson = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target)
    const listObject = {
      name: newName,
      phone: phone,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: newName.length + 1,
    }

    if (allNames.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setPhone('')
      return
    }
    setPersons(persons.concat(listObject))
    setNewName('')
    setPhone('')

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)

  }
  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setPhone(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
    setFilter(allNames.filter(name => name.includes(search)).map((filterName) => <p>{filterName.toLowerCase()}</p>))
    console.log(filter, "search")

  }

  const showAll = persons.map((person, i) => <p key={i}>{person.name} {person.number}</p>)
  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Search</h2>
      <div>
        <input
          value={search}
          onChange={handleSearch}
        />
      </div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
           <input
            value={newName}
            onChange={handleNameChange} />
        </div>
        <div>number:
          <input
            value={phone}
            onChange={handlePhoneChange}
          /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {search.length > 0 ? <p>{filter}</p> : showAll}
    </div>
  )
}

export default App
