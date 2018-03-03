import React from 'react'
import Blogs from './components/Blogs'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { Notification, Error } from './components/Notification'
import ButtonTogglable from './components/ButtonTogglable';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.storagename = "fullstackblogisovellususer"
    this.state = this.emptyState()
  }

  emptyState() {
    const emptyState = {
      blogs: [],
      user: null,
      error: null,
      notification: null,
    }
    return emptyState
  }

  resetState() {
    window.localStorage.removeItem(this.storagename)
    blogService.setUser(null)
    this.setState(this.emptyState())
  }

  updateBlogs() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  setUser(user = null) {
    if (!user) {
      this.resetState()
    } else {
      window.localStorage.setItem(this.storagename, JSON.stringify(user))
      this.setState({ user })
      blogService.setUser(user)
    }
    this.updateBlogs()
  }

  componentDidMount() {
    const user = window.localStorage.getItem(this.storagename)
    if (user)
      this.setUser(JSON.parse(user))
    else
      this.setUser(null)
  }

  logOut = () => {
    this.setUser(null)
  }

  error = (error, newState = null) => {
    let errmsg = null
    if (typeof (error) === "string")
      errmsg = error
    if (typeof (error) === "object" && error.response && error.response.data && error.response.data.error)
      errmsg = error.response.data.error
    console.log(error, errmsg)
    if (errmsg) {
      this.setState({ error: errmsg })
      if (newState)
        this.setState(newState)
      setTimeout(() => {
        if (this.state.error === errmsg)
          this.setState({ error: null })
      }, 5000)
    }
  }

  notify = (notification, newState = null) => {
    this.setState({ notification })
    if (newState)
      this.setState(newState)
    setTimeout(() => {
      if (this.state.notification === notification)
        this.setState({ notification: null })
    }, 5000)
  }

  loginForm() {
    return (
      <LoginForm app={this} />
    )
  }

  blogForm() {
    return (
      <div>
        <div>
          <p>{this.state.user.name} kirjautuneena</p>
          <button onClick={this.logOut}>Kirjaudu ulos</button>
        </div>
        <ButtonTogglable showLabel="Lisää blogi" hideLabel="Sulje kaavake">
          <CreateBlogForm app={this} />
        </ButtonTogglable>
        <h3>blogeja:</h3>
        <Blogs app={this} blogs={this.state.blogs} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <h2>Blogit</h2>
        <Error message={this.state.error} />
        <Notification message={this.state.notification} />
        {this.state.user ? this.blogForm() : this.loginForm()}
      </div>
    );
  }
}

export default App;
