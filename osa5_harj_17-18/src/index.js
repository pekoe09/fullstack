import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, btnText }) => (
  <button onClick={handleClick}>{btnText}</button>
)

const Statistics = (props) => (
  <div>
    <Header text="statistiikka" />
    {props.goods + props.neutrals + props.bads > 0 ? (
      <table>
        <tbody>
          <Statistic label="hyvä" value={props.goods} />
          <Statistic label="neutraali" value={props.neutrals} />
          <Statistic label="huono" value={props.bads} />
          <Statistic label="keskiarvo" value={props.getAverage()} />
          <Statistic label="positiivisia" value={props.getGoodShare()} />
        </tbody>
      </table>
    ) : (
        <p>ei yhtään palautetta annettu</p>
      )}
  </div>
)

const Statistic = ({ label, value }) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
)

const store = createStore(counterReducer)

class App extends React.Component {

  getAverage = () => {
    const state = store.getState()
    return (
      (state.good - state.bad) /
      (state.good + state.ok + state.bad)
    ).toFixed(1)
  }

  getGoodShare = () => {
    const state = store.getState()
    return ((state.good /
      (state.good + state.ok + state.bad)
      * 100
    ).toFixed(1) + "%")
  }

  render() {
    const state = store.getState()

    return (
      <div>
        <Header text="anna palautetta" />
        <Button handleClick={e => store.dispatch({ type: 'GOOD' })} btnText="hyvä" />
        <Button handleClick={e => store.dispatch({ type: 'NEUTRAL' })} btnText="neutraali" />
        <Button handleClick={e => store.dispatch({ type: 'BAD' })} btnText="huono" />
        <Statistics
          goods={state.good}
          neutrals={state.ok}
          bads={state.bad}
          getAverage={this.getAverage}
          getGoodShare={this.getGoodShare}
        />
        <Button handleClick={e => store.dispatch({ type: 'RESET' })} btnText="nollaa tilasto" />
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)