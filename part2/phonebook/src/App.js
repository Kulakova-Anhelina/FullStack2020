import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: "040-1223567" }
  ])
  const [newName, setNewName] = useState('')
  const [phone, setPhone] = useState('')


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
    const allNames = persons.map((person) => person.name)
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

  return (
    <div>
      <div>debug: {newName}</div>
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
      {persons.map((person, i) => <p key={i}>{person.name} {person.phone}</p>)}
    </div>
  )
}

export default App
