import React from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => <button onClick={props.handleClick}>{props.label}</button>
const Statistics = (props) => {
  const arr = props.things.map(thing => thing.value())
  const len = arr.reduce((a, b) => a + b, 0)
  const avg = (arr[0] - arr[2]) / len
  const pospct = arr[0] / len * 100

  if (len === 0)
    return (
      <div>
        <h1>Statistiikka</h1>
        <p>Ei tilastoja</p>
      </div>
    )

  return (
    <div>
      <h1>Statistiikka</h1>
      {
        props.things.map((thing, idx) => (
          <Statistic key={idx} label={thing.label} value={thing.value()} />
        ))
      }
      <Statistic label="keskiarvo" value={avg.toFixed(1)} />
      <Statistic label="positiivisia" value={pospct.toFixed(1) + " %"} />
    </div>
  )
}
const Statistic = (props) => (<p>{props.label}: {props.value}</p>)

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0,
    }
    const app = this
    this.add = (thing) => () => (app.setState((state) => ({ [thing.name]: state[thing.name] + 1 })))
    const valuef = function () { return app.state[this.name] }
    this.things = [
      { label: "hyvä", name: "good", value: valuef },
      { label: "neutraali", name: "neutral", value: valuef },
      { label: "huono", name: "bad", value: valuef },
    ]
  }


  render() {
    return (
      <div>
        <h1>Anna palautetta</h1>
        {
          this.things.map((thing, idx) => {
            return <Button key={idx} label={thing.label} handleClick={this.add(thing)} />
          })
        }
        <Statistics things={this.things} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
