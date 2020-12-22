import React from 'react'
import PropTypes from 'prop-types'

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


SuccessNotification.propTypes = {
  messageSucsess: PropTypes.string
}
SuccessNotification.defaultProps = {
  messageSucsess: null
}
export default SuccessNotification