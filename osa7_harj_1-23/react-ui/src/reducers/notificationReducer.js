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
    console.log('Dispatching ', message)
    await dispatch({
      type: 'SET',
      notification: { message, type }
    })
    console.log('Setting notification timeout for ', message, ' ', 1000*timeout, 'secs')
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, timeout * 1000)
  }
}

export default notificationReducer