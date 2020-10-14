import React from 'react'

const Persons = (props) => {

  const showAll = props.persons.map((person, i) => <p key={i}>{person.name} {person.number}</p>)
  return (
    <div>
     {props.search.length > 0 ? <p>{props.filter}</p> : showAll}
  </div>
  )

}

export default Persons