import React from 'react';
import axios from 'axios'
import Result from './components/Result';
import Input from './components/Input';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      search: '',
    }
    this.onChange = Input.onChange(this)
  }

  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  onClick = () => (c) => () => {
    this.setState({search: c.name})
  }

  render() {
    return (
      <div>
        <Input.Input state={this.state} label="find countries" variable="search" onChange={this.onChange} />
        <Result countries={this.state.countries} search={this.state.search} onClick={this.onClick()} />
      </div>
    )
  }
}

export default App
