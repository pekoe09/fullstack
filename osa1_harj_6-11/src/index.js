import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, btnText }) => (
  <button onClick={handleClick}>{btnText}</button>
)

const Statistics = (props) => (
  <div>
    <Header text="statistiikka" />
    {props.goods + props.neutrals + props.bads > 0 ? (
      <div>        
        <Statistic label="hyvä" value={props.goods} />
        <Statistic label="neutraali" value={props.neutrals} />
        <Statistic label="huono" value={props.bads} />
        <Statistic label="keskiarvo" value={props.getAverage()} />
        <Statistic label="positiivisia" value={props.getGoodShare()} />
      </div>
    ) : (
      <p>ei yhtään palautetta annettu</p>
    )}
  </div>
)

const Statistic = ({ label, value }) => (
  <p>{label} {value}</p>
)

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

  getAverage = () => (
    (this.state.goods - this.state.bads) /
    (this.state.goods + this.state.neutrals + this.state.bads)
  ).toFixed(1)

  getGoodShare = () => (
    this.state.goods /
    (this.state.goods + this.state.neutrals + this.state.bads)
    * 100
  ).toFixed(1) + "%"    

  render() {
    return (
      <div>
        <Header text="anna palautetta" />
        <Button handleClick={this.addGood} btnText="hyvä" />
        <Button handleClick={this.addNeutral} btnText="neutraali" />
        <Button handleClick={this.addBad} btnText="huono" />
        <Statistics
          goods={this.state.goods}
          neutrals={this.state.neutrals}
          bads={this.state.bads}
          getAverage={this.getAverage}
          getGoodShare={this.getGoodShare}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))