
import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phone, setPhone] = useState('')
  const [search, setSearch] = useState([])
  const [filter, setFilter] = useState([])
  const allNames = persons.map((person) => person.name)
  const [errorMessage, setErrorMessage] = useState(null)
  const [sucessMessage, setSucessMessage] = useState(null)

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


    allNames.includes(newName) ? updatePerson() : createPerson()
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
        setSucessMessage(`added ${newName}`)

        setTimeout(() => {
          setSucessMessage(null)
        }, 5000)

      }).catch(error => {
        console.log(error.response.data, "Hi")
        setErrorMessage(<p>{error.response.data.error}</p>)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  // delete person
  const handleDelete = (id, name) => {
    console.log("hello", id)
    if (window.confirm(`Do you really want to delete the user ${name}?`) === true) {
      personService
        .deletePersona(id)
        .then(_ => {
          setPersons(persons.filter(p => id !== p.id))
        }).catch(error => {
          setErrorMessage(
            error
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }


  }
  // edit person
  const updatePerson = () => {
    if (window.confirm(` ${newName} is already exist in phonebook, would you like to update the phone?`) === true) {
      const persona = persons.find(n => n.name === newName);
      const id = persona.id
      console.log(persona);
      const changedNumber = { ...persona, number: phone }
      console.log(changedNumber, "number")
      personService
        .update(id, changedNumber)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setNewName('')
          setPhone('')
          setSucessMessage(`number of ${newName} was changed`)
          setTimeout(() => {
            setSucessMessage(null)
          }, 5000)
          console.log(persons, "here")
        }).catch(error => {
          setErrorMessage(
            `Information of '${newName}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
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
      <h1>Phonebook</h1>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification messageSucsess={sucessMessage} />
      <Filter
        handleSearch={handleSearch}
        search={search}
      />
      <h1>Add a new</h1>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        phone={phone}
        newName={newName}
      />
      <h1>Numbers</h1>
      {display}

    </div>
  )
}

export default App
