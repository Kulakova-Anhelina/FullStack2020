import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateAnecdote = async (id, updatedObject) => {
console.log(updatedObject, "id service");
console.log("newObject", updatedObject);
const response = await axios.put(`${baseUrl}/${id}`, updatedObject)
return response.data
}

export default { getAll, createNew, updateAnecdote }