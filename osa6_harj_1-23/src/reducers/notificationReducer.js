const notificationReducer = (store = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR':
      return ''
    default:
      return store
  }
}

export const notificationSetting = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const notificationClearing = () => {
  return {
    type: 'CLEAR'
  }
}

export default notificationReducer