import axios from 'axios'
import "babel-polyfill"
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(
    `${baseUrl}/${blog.id}`,
    { likes: blog.likes },
    config
  )
  return response.data
}

const del = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${blog.id}`, config)
}

export default { getAll, create, update, setToken, del }