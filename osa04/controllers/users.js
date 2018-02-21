const bcrypt = require('bcrypt')
const User = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', {
        _id: 1,
        title: 1,
        author: 1,
        url: 1,
        likes: 1,
        user: 1,
      })
    response.json(users.map(User.format))
  } catch (err) {
    console.log(err)
    return response.status(400).send({ error: 'something went wrong' })
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const { username, password, name, adult, } = request.body

    if (password === undefined || password.length < 3) {
      return response.status(400).json({ error: 'password expected to be 3 or more characters' })
    }

    const existingUser = await User.find({ username })
    if (existingUser.length !== 0) {
      return response.status(400).json({ error: 'username must be unique' })
    }

    const salt = 10
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
      username,
      passwordHash,
      name,
      adult: (adult === undefined) ? true : !!adult,
    })

    const result = await user.save()
    return response.status(201).json(User.format(result))
  } catch (err) {
    console.log(err)
    return response.status(400).send({ error: 'something went wrong' })
  }
})

module.exports = usersRouter
