import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_YEAR, ALL_AUTHORS } from '../queries'

const EditForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [changeNumber] = useMutation(EDIT_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = (event) => {
    event.preventDefault()

    changeNumber({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>change year</h2>

      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone <input
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