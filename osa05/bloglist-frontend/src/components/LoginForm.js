import React from 'react'
import BaseComponent from './BaseComponent'
import loginService from '../services/login'

class LoginForm extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()
    try {
      const { username, password } = this.state
      const user = await loginService.logIn(username, password)
      this.app.setUser(user)
    } catch (error) {
      this.app.error(error)
    }
  }

  render() {
    return (
      <div>
        <h2>Kirjaudu sovellukseen:</h2>
        <form onSubmit={this.onSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>tunnus:</label>
                </td>
                <td>
                  <input name="username" value={this.state.username} onChange={this.onChange}></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label>salasana:</label>
                </td>
                <td>
                  <input type="password" name="password" value={this.state.password} onChange={this.onChange}></input>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <button type="submit">Kirjaudu</button>
        </form>
      </div>
    );
  }
}

export default LoginForm
