import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      goods: 0,
      neutrals: 0,
      bads: 0
    }
  }

  addGood = () => {
    this.setState((prevState) => ({
      goods: prevState.goods + 1
    }))
  }

  addNeutral = () => {
    this.setState((prevState) => ({
      neutrals: prevState.neutrals + 1
    }))
  }

  addBad = () => {
    this.setState((prevState) => ({
      bads: prevState.bads + 1
    }))
  }

  getAverage = () => {
    if (this.state.goods + this.state.neutrals + this.state.bads > 0) {
      return (
        (this.state.goods - this.state.bads) /
        (this.state.goods + this.state.neutrals + this.state.bads)
      ).toFixed(1)
    } else {
      return "-"
    }
  }

  getGoodShare = () => {
    if (this.state.goods + this.state.neutrals + this.state.bads > 0) {
      return (
        this.state.goods /
        (this.state.goods + this.state.neutrals + this.state.bads)
        * 100
      ).toFixed(1) + "%"
    } else {
      return "-"
    }
  }

  render() {
    return (
      <div>
        <h1>anna palautetta</h1>
        <button onClick={this.addGood}>hyvä</button>
        <button onClick={this.addNeutral}>neutraali</button>
        <button onClick={this.addBad}>huono</button>
        <h1>statistiikka</h1>
        <p>hyvä {this.state.goods}</p>
        <p>neutraali {this.state.neutrals}</p>
        <p>huono {this.state.bads}</p>
        <p>keskiarvo {this.getAverage()}</p>
        <p>positiivisia {this.getGoodShare()}</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))