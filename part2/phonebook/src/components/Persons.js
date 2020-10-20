import React from 'react'



const Persons = ({name, number, handleDelete}) => {
console.log(name, number)
  return (
    <div>
       <p >{name} {number}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )

}

export default Persons