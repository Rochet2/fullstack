const Blog = require('../models/blog')
const blogsRouter = require('express').Router()

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(Blog.format))
    })
})

blogsRouter.post('/', (request, response) => {
  const { title, author, url, likes, } = request.body

  if (title === undefined) {
    return response.status(400).json({ error: 'title missing' })
  }
  if (url === undefined) {
    return response.status(400).json({ error: 'url missing' })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0
  })

  blog
    .save()
    .then(result => {
      response.status(201).json(Blog.format(result))
    })
})

module.exports = blogsRouter
