const mongoose = require('mongoose')
const utils = require('../utils/utils')

const userSchema = new mongoose.Schema ({
  username: String,
  passwordHash: String,
  name: String,
  adult: Boolean,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
})

userSchema.statics.format = function ({ _id, username, name, adult, blogs }) {
  return utils.DropUndefined({
    _id: (_id === undefined) ? _id : _id.toString(),
    username,
    name,
    adult,
    blogs,
  })
}

const User = mongoose.model('User', userSchema)

module.exports = User
