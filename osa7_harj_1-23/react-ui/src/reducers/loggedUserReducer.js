import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const loggedUserReducer = (store = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user
    case 'CLEAR_USER':
      return {}
    default:
      return store
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password
    })
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)
    userService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

export const loadUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    let user = {}
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
    }
    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

export const clearLoggedUser = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    dispatch({
      type: 'CLEAR_USER'
    })
  }
}

export default loggedUserReducer