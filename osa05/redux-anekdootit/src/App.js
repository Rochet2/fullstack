import React from 'react';


class App extends React.Component {

  submit(event) {
    event.preventDefault()
    this.props.store.dispatch({
      type: "NEW",
      anecdote: event.target.anekdootti.value
    })
    event.target.anekdootti.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.props.store.dispatch({ type: 'VOTE', id: anecdote.id })}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.submit.bind(this)}>
          <div><input name='anekdootti'/></div>
          <button type='submit'>create</button>
        </form>
      </div>
    )
  }
}

export default App