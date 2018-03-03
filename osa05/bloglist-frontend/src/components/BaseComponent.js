import React from 'react'

class BaseComponent extends React.Component {
  constructor(props) {
    super(props)
    this.app = props.app
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
}

export default BaseComponent