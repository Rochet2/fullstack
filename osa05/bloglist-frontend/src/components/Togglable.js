import React from 'react';

class Togglable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    toggle = () => {
        this.setState({ visible: !this.state.visible })
    }

    hideWhenVisible() { return { display: this.state.visible ? 'none' : '' } }
    showWhenVisible() { return { display: this.state.visible ? '' : 'none' } }
}

export default Togglable