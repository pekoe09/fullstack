import userService from '../services/users'

const userReducer = (store = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.users
    default:
      return store
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      users
    })
  }
}

export default userReducer