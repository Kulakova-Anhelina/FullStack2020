import React from 'react'

const SuccessNotification = ({  messageSucsess }) => {
  if (messageSucsess === null) {
    return null
  }
  return (
    <div>
     <p  className="success">{messageSucsess}</p>
    </div>
  )
}

export default SuccessNotification