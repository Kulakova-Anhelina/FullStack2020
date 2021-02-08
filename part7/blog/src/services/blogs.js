import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const request = axios.post(baseUrl, blog, getConfig())
  return request.then(response => response.data)
}

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
  return response.data

}

const remove = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, getConfig())
  const response = await request
  return response.data
}

export default { getAll, create, update, remove }