
import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phone, setPhone] = useState('')
  const [search, setSearch] = useState([])
  const [filter, setFilter] = useState([])
  const allNames = persons.map((person) => person.name)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
// input name
  const handleNameChange = (event) => {
    setNewName(event.target.value)

  }

  // input phone
  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setPhone(event.target.value)
  }

  // search
  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
    setFilter(allNames.filter(name =>
      name.includes(search)).map((filterName) => <p>{filterName.toLowerCase()}</p>))
    console.log(filter, "search")

  }

  // add or update person
  const addPerson = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target)


    allNames.includes(newName)? updatePerson() : createPerson()
  }

  // create  a  new person
  const createPerson = () => {
    const listObject = {
      name: newName,
      number: phone,
      id: newName.length + 1,
    }
    personService
      .create(listObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setPhone('')
      }).catch(err => {
        console.log(err);
      });
  }

// delete person
  const handleDelete = (id, name) => {
    console.log("hello", id)
    if (window.confirm(`Do you really want to delete the user ${name}?`) === true) {
      personService
        .deletePersona(id)
        .then(_ => {
          setPersons(persons.filter(p => id !== p.id))
        }).catch(err => {
          console.log(err);
        });
    }

  }
  // edit person
  const updatePerson = () => {
    if (window.confirm(` ${newName} is already exist in phonebook, would you like to update the phone?`) === true){
      const persona = persons.find(n => n.name === newName);
      const id = persona.id
      console.log(persona);
      const changedNumber = { ...persona, number : phone}
      console.log(changedNumber, "number")
      personService
      .update(id, changedNumber)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setPhone('')
        console.log(persons, "here")
      }).catch(err => {
        console.log(err);
      });
    }

  }

  const display = search.length > 0 ? filter :
    persons.map((person) =>
      <Persons
        key={person.id}
        name={person.name}
        number={person.number}
        handleDelete={() => handleDelete(person.id, person.name)} />)


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        handleSearch={handleSearch}
        search={search}
      />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        phone={phone}
        newName={newName}
      />
      <h2>Numbers</h2>
      {display}

    </div>
  )
}

export default App
