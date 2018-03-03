const mongoose = require('mongoose')
const utils = require('../utils/utils')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

blogSchema.statics.format = function ({ _id, title, author, url, likes, user }) {
  return utils.DropUndefined({
    _id: (_id === undefined) ? _id : _id.toString(),
    title,
    author,
    url,
    likes,
    user,
  })
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
