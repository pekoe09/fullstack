import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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

const Notification = ({notification}) => {
  // if (notification.type === 'error') {
  //   notificationStyle.color = 'red'
  //   notificationStyle.borderColor = 'red'
  // }
  return (
    <div>
      {
        notification.type === 'success'
        && <div style={{ ...notificationStyle, ...successStyle }}>{notification.message}</div>
      }
      {
        notification.type === 'error'
        && <div style={{ ...notificationStyle, ...errorStyle }}>{notification.message}</div>
      }
    </div>
  )
}

const mapStateToProps = (store) => {
  return {
    notification: store.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)