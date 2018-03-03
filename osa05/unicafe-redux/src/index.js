import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';
import App from './App';
import {createStore} from 'redux'
import reducer from './reducer'

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
}

const store = createStore(reducer)
store.subscribe(renderApp)
renderApp()
