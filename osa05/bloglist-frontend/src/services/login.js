import axios from 'axios'
const baseUrl = '/api/login'

const logIn = async (username, password) => {
  const response = await axios.post(baseUrl, {username, password})
  return response.data
}

export default { logIn }