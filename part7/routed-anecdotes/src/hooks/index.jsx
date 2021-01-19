import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

const onClick =()=>{
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onClick
  }
}

// modules can have several named exports
export const useAnotherHook = () => {

}