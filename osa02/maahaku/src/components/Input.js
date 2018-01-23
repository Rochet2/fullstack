import React from 'react';

const Input = p => {
    const variableName = p.variable
    return (
        <div>
            <label>{p.label}:</label> <input value={p.state[variableName]} onChange={p.onChange(variableName)} />
        </div>
    )
}

/**
 * Sets the value of given key in app.state to event.target.value
 * Must bind 'this' to app to get access to app.setState
 * @param {*} app
 */
const onChange = (app) => (key) => (event) => {
    app.setState({ [key]: event.target.value })
}

export default { Input, onChange }
