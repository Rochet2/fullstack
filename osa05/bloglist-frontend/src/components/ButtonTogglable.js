import React from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

class ButtonTogglable extends Togglable {

  label() { return this.state.visible ? this.props.hideLabel : this.props.showLabel }

  render() {
      return (
          <div>
              <div style={this.showWhenVisible()}>
                  {this.props.children}
              </div>
              <button onClick={this.toggle}>{this.label()}</button>
          </div>
      )
  }
}

ButtonTogglable.propTypes = {
  hideLabel: PropTypes.string.isRequired,
  showLabel: PropTypes.string.isRequired,
}

export default ButtonTogglable