import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data.sort((a, b) => {
    if (a.likes < b.likes) {
      return 1
    }
    if (a.likes > b.likes) {
      return -1
    }
    return 0
  }))
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newBlog) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const comment = async (comment, blogId) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, comment)
  return response.data
}

const update = async (blog) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const url = baseUrl + '/' + blog.id
  const response = await axios.put(url, blog, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const url = baseUrl + '/' + id
  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, setToken, create, comment, update, remove }