const notificationReducer = (store = {}, action) => {
  switch (action.type) {
    case 'SET':
      return action.notification
    case 'CLEAR':
      return {}
    default:
      return store
  }
}

export const setNotification = (message, type, timeout) => {
  return async (dispatch) => {
    await dispatch({
      type: 'SET',
      notification: { message, type }
    })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, timeout * 1000)
  }
}

export default notificationReducer