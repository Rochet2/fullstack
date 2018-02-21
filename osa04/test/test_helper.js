const Blog = require('../models/blog')
const User = require('../models/user')

const InitialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const InitialUsers = [
  {
    _id: '8a422bc61b54a676234d17fc',
    username: 'marja3',
    name: 'Terttu',
    passwordHash: '8c422bc61b54a676234d17fc',
    adult: true,
  },
  {
    _id: '3a422bc61b54a676234d17fc',
    username: 'pete90',
    name: 'Pekka',
    passwordHash: '3d422bc61b54a676234d17fc',
    adult: true,
  },
  {
    _id: '6a422bc61b54a676234d17fc',
    username: 'user99',
    name: 'Pertti',
    passwordHash: '6b422bc61b54a676234d17fc',
    adult: false,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    username: 'root',
    name: 'admin',
    passwordHash: '5a422bc61b54a676234d17fc',
    adult: true,
  },
]

const GetBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(Blog.format)
}

const NewBlog = (fields = {}) => Object.assign(
  {
    title: 'Pertin blogi',
    author: 'Pertti',
    url: 'www.google.com',
    likes: 0,
    userid: '8a422bc61b54a676234d17fc',
  },
  fields
)

const GetUsers = async () => {
  const users = await User.find({})
  return users.map(User.format)
}

let usernameid = 0
const GenUsername = () => ('user'+(usernameid++))

const NewUser = (fields = {}) => Object.assign(
  {
    username: GenUsername(),
    name: 'my name',
    password: 'my password',
    adult: false,
  },
  fields
)

const GetUnusedId = () => '000'

const ModifyHash = (hash, overwrite = {}) => Object.assign({}, hash, overwrite)

module.exports = {
  ModifyHash,
  GetUnusedId,
  GenUsername,

  InitialBlogs,
  GetBlogs,
  NewBlog,

  InitialUsers,
  GetUsers,
  NewUser,
}
