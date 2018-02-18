import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data.sort((a, b) => {
    if (a.name < b.name) {
      return 1
    }
    if (a.name > b.name) {
      return -1
    }
    return 0
  }))
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }