import React from 'react'
import {useField, useAnotherHook} from '../hooks/index'


const CreateNew = (props) => {
  const content  = useField('content')
  const author  = useField('author')
  const info  = useField('info')
  const reset = useField('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input  {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button {...reset} >resert</button>
      </form>

    </div>
  )

}
export default CreateNew