import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, app }) => {
  const bloglist = blogs.slice()
  bloglist.sort(
    (a, b) => b.likes - a.likes
  )
  return bloglist.map(
    blog => <Blog app={app} key={blog._id} blog={blog} />
  )
}

export default Blogs