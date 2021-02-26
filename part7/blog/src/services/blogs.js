import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = async () => {
  const response =await axios.get(baseUrl)
  return response.data
}

const create = async ({url, author, title}) => {
  const object = {title, url, author, likes: 0 }
  console.log(object, "obj");
  const response = await axios.post(baseUrl, object, getConfig())
  return response.data
}

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
  return response.data

}

const remove = async (id) => {
  console.log(id, "SERVICE")
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return response.data
}

export default { getAll, create, update, remove }