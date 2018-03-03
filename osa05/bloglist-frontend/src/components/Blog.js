import React from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const DeleteButton = ({ user, app, comp }) => {
  if (!user || (user && app.state.user && app.state.user.username === user.username))
    return <p><button onClick={async () => comp.delete()}>poista</button></p>
  return null
}

class Blog extends Togglable {

  async like() {
    try {
      await blogService.like(this.props.blog)
      this.props.app.updateBlogs()
    } catch (error) {
      this.props.app.error(error)
    }
  }

  async delete() {
    try {
      const blog = this.props.blog
      if (!window.confirm(`Poista ${blog.title}, tekijä ${blog.author}?`))
        return
      await blogService.deleteBlog(blog)
      this.props.app.updateBlogs()
    } catch (error) {
      this.props.app.error(error)
    }
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    const user = this.props.blog.user
    const blog = this.props.blog
    return (
      <div style={blogStyle} className="wrapper">
        <div onClick={this.toggle} className="title">
          <p>{blog.title}, tekijä {blog.author}</p>
        </div>
        <div style={this.showWhenVisible()} className="content">
          <p><a href={blog.url}>{blog.url}</a></p>
          <p>{blog.likes} tykkäystä <button onClick={async () => this.like()}>Tykkää</button></p>
          <p>Lisännyt {user ? user.name : "nyymi"}</p>
          <DeleteButton user={user} app={this.props.app} comp={this} />
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  app: PropTypes.object,
}

export default Blog