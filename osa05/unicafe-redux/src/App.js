import React from 'react'
import './App.css'

const SummaaPalautteet = (state) => state ? state.good + state.bad + state.ok : 0



const Statistiikka = ({ state, onClickHandler }) => {
  const palautteita = SummaaPalautteet(state)

  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{state.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{state.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{(state.good/palautteita*100).toFixed(1)}%</td>
          </tr>
        </tbody>
      </table>

      <button onClick={onClickHandler}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    this.props.store.dispatch({ type: nappi })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka state={this.props.store.getState()} onClickHandler={() => this.props.store.dispatch({ type: 'ZERO' })} />
      </div>
    )
  }
}

export default App;
