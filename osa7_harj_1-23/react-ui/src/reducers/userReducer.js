import userService from '../services/users'

const userReducer = (store = [], action) => {
  console.log('Received ', action)
  switch (action.type) {
    case 'INIT_USERS':
    {console.log('Returning ', action.users)
      return action.users
    }
    default:
    {
      console.log('Returning default')
      return store
    }
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    console.log('INIT_USERS')
    const users = await userService.getAll()
    console.log(users)
    dispatch({
      type: 'INIT_USERS',
      users
    })
  }
}

export default userReducer