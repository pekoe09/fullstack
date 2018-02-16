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

export const notify = (notification, timeout) => {
  return async (dispatch) => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, timeout * 1000)
  }
}

export default notificationReducer