const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema ({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.statics.format = function ({ _id, title, author, url, likes }) {
  return {
    _id,
    title,
    author,
    url,
    likes,
  }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
