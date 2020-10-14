import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const addName =(event) =>{
    event.preventDefault();
    console.log('button clicked', event.target)
    const listObject = {
      name: newName,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: newName.length + 1,
    }

    setPersons(persons.concat(listObject))
    setNewName('')

  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
           <input
           value={newName}
           onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
  {persons.map((person, i) => <p key={i}>{person.name}</p>)}
    </div>
  )
}

export default App
