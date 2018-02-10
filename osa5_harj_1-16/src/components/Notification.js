import React from 'react'
import PropTypes from 'prop-types'

let notificationStyle = {
  borderStyle: 'solid',
  borderWidth: 2,
  borderRadius: 4,
  padding: 10
}

let successStyle = {
  color: 'green',
  borderColor: 'green',
}

let errorStyle = {
  color: 'red',
  borderColor: 'red',
}

const Notification = ({ message, error }) => {
  if (error) {
    notificationStyle.color = 'red'
    notificationStyle.borderColor = 'red'
  }
  return (
    <div>
      {message && <div style={{ ...notificationStyle, ...successStyle }}>{message}</div>}
      {error && <div style={{ ...notificationStyle, ...errorStyle }}>{error}</div>}
    </div>
  )
}

export default Notification

Notification.propTypes = {
  message: PropTypes.string,
  error: PropTypes.string
}