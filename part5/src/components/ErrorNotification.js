
import React from 'react'
import PropTypes from 'prop-types'

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div>
      <p className="error">{message}</p>
    </div>
  )
}
ErrorNotification.propTypes = {
  message: PropTypes.string
}
ErrorNotification.defaultProps = {
  message: null
}
export default ErrorNotification