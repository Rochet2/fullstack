const Blog = require('../models/blog')
const User = require('../models/user')
const blogsRouter = require('express').Router()
const utils = require('../utils/utils')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', {
        _id: 1,
        username: 1,
        name: 1,
      })
    return response.json(blogs.map(Blog.format))
  } catch (err) {
    console.log(err)
    return response.status(400).send({ error: 'something went wrong' })
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const { title, author, url, likes } = request.body

    const userid = utils.GetUserId(request.token)
    if (!userid) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (title === undefined) {
      return response.status(400).json({ error: 'title missing' })
    }
    if (url === undefined) {
      return response.status(400).json({ error: 'url missing' })
    }

    const user = await User.findById(userid)

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    return response.status(201).json(Blog.format(savedBlog))
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      response.status(401).json({ error: err.message })
    } else {
      console.log(err)
      return response.status(500).send({ error: 'something went wrong' })
    }
  }
})

blogsRouter.patch('/:id', async (request, response) => {
  try {
    const { likes } = request.body

    const mods = {
      likes: likes || 0,
    }

    const blog = await Blog.findByIdAndUpdate(request.params.id, mods, { new: true })
    return response.json(Blog.format(blog))
  } catch (err) {
    console.log(err)
    return response.status(400).send({ error: 'could not patch' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const userid = utils.GetUserId(request.token)
    if (!userid) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() !== userid.toString())
      return response.status(401).send({ error: 'you must own the blog' })

    await blog.remove()
    return response.status(204).end()
  } catch (err) {
    console.log(err)
    return response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter
