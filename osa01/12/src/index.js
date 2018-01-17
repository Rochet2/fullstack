import React from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => <button onClick={props.handleClick}>{props.label}</button>
const Anecdote = function (props) {
  const app = props.app
  const selected = props.selected
  return (
    <div>
      <p>Votes: {app.state.votes[selected]}</p>
      <p>{app.props.anecdotes[selected]}</p>
    </div>
  )
}
const Statistics = function (props) {
  const arr = props.app.state.votes
  const maxvote = Math.max(...arr)
  if (maxvote === 0)
    return null;
  const selected = arr.indexOf(maxvote);
  return (
    <div>
      <h1>anecdote with most votes:</h1>
      <Anecdote app={props.app} selected={selected} />
    </div>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: new Array(props.anecdotes.length).fill(0)
    }
    const app = this
    const getanecdote = function () {
      return Math.floor(Math.random() * app.props.anecdotes.length)
    }
    this.newanec = () => {
      app.setState(
        { selected: getanecdote() }
      )
    }
    this.addvote = (selection) => () => {
      app.setState((state) => state.votes[selection] += 1)
    }
  }

  render() {
    return (
      <div>
        <Button label="new anecdote" handleClick={this.newanec} />
        <Button label="vote" handleClick={this.addvote(this.state.selected)} />
        <Anecdote app={this} selected={this.state.selected} />
        <Statistics app={this} />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
