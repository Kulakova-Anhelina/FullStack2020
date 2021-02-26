import axios from 'axios'
const baseUrl = '/api/login'

const login = async ({password, username}) => {
  const credentials = {password, username}
console.log(credentials);
  const response = await axios.post(baseUrl, credentials)
  return response.data
}


export default { login }