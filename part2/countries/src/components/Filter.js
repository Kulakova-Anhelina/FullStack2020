import React from 'react'

const Filter = ({search, handleSearch}) => {


  return (
    <div>
    <input
      value={search}
      onChange={handleSearch}
    />
  </div>
  )

}

export default Filter