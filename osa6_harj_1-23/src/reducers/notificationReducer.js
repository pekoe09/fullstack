const notificationReducer = (store = 'testiviesti', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { ...store, notification: action.notification }
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

export default notificationReducer