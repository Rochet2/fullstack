import React from 'react'
import BaseComponent from './BaseComponent'
import blogService from '../services/blogs'

class CreateBlogForm extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      author: "",
      url: "",
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()
    try {
      const { title, author, url } = this.state
      const newBlog = await blogService.create({ title, author, url })
      this.app.updateBlogs()
      this.app.notify(`Uusi blogi '${newBlog.title}', tekijä ${newBlog.author} lisätty`)
    } catch (error) {
      this.app.error(error)
    }
  }

  render() {
    return (
      <div>
        <h3>Luo blogi:</h3>
        <form onSubmit={this.onSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>nimi:</label>
                </td>
                <td>
                  <input name="title" value={this.state.title} onChange={this.onChange}></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label>tekijä:</label>
                </td>
                <td>
                  <input name="author" value={this.state.author} onChange={this.onChange}></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label>linkki:</label>
                </td>
                <td>
                  <input name="url" value={this.state.url} onChange={this.onChange}></input>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <button type="submit">Lähetä</button>
        </form>
      </div>
    );
  }
}

export default CreateBlogForm