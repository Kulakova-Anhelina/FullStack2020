import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select';

import { EDIT_YEAR, ALL_AUTHORS } from '../queries'

const EditForm = ({ authors }) => {
  let [name, setName] = useState({
    value: '',
    name: ''
  })
  const [born, setBorn] = useState('')

  const [changeNumber] = useMutation(EDIT_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = (event) => {
    event.preventDefault()
    name = name.value
    changeNumber({ variables: { name, born } })
    setName({
      value: '',
      name: ''
    })
    setBorn('')
  }

  var options = authors.data?.allAuthors.map((a, index) => {
    return {
      label: a.name,
      value: a.name,
    }
  });
  console.log(options);

  return (
    <div>
      <h2>change year</h2>

      <form onSubmit={submit}>
        <Select
          value={name}
          onChange={setName}
          options={options}
        />
        <div>
          year <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>change year</button>
      </form>
    </div>
  )
}

export default EditForm