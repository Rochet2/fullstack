import axios from 'axios'
const baseUrl = '/api/blogs'

let user = null

const setUser = (newUser) => {
  user = newUser
}

const config = () => (user && user.token ? { headers: { authorization: "bearer " + user.token } } : {})

const getAll = () => {
  const request = axios.get(baseUrl, {}, config())
  return request.then(response => response.data)
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, config())
  return response.data
}

const like = async (blog) => {
  const response = await axios.patch(`${baseUrl}/${blog._id}`, { likes: blog.likes + 1 }, config())
  return response.data
}

const deleteBlog = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog._id}`, config())
  return response.data
}

export default { getAll, create, setUser, like, deleteBlog }