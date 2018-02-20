const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length <= 0)
    return null
  return blogs.reduce((favblog, blog) => favblog.likes < blog.likes ? blog : favblog, blogs[0])
}

const mostBlogs = (blogs) => {
  var authorblogs = {}
  blogs.forEach(blog => {
    authorblogs[blog.author] = (authorblogs[blog.author] || 0) + 1
  })
  var most = null
  for (const author of Object.keys(authorblogs)) {
    if (most === null || most.blogs < authorblogs[author])
      most = { author, blogs: authorblogs[author] }
  }
  return most
}

const mostLikes = (blogs) => {
  var authorlikes = {}
  blogs.forEach(blog => {
    authorlikes[blog.author] = (authorlikes[blog.author] || 0) + blog.likes
  })
  var most = null
  for (const author of Object.keys(authorlikes)) {
    if (most === null || most.likes < authorlikes[author])
      most = { author, likes: authorlikes[author] }
  }
  return most
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
