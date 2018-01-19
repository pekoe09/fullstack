import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, btnText }) => <button onClick={handleClick}>{btnText}</button>

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0, 0, 0, 0, 0, 0],
      favorite: 0
    }
  }

  getNext = () => () => this.setState({ selected: Math.floor(Math.random() * 6) })

  vote = () => () => {
    let newVotes = this.state.votes.slice()
    newVotes[this.state.selected] = newVotes[this.state.selected] + 1
    let newFavorite = newVotes[this.state.selected] > newVotes[this.state.favorite] ?
      this.state.selected : this.state.favorite
    this.setState({
      votes: newVotes,
      favorite: newFavorite
    })
  }

  render() {
    return (
      <div>
        <div>{this.props.anecdotes[this.state.selected]}</div>
        <div>has {this.state.votes[this.state.selected]} votes</div>
        <div>
          <Button handleClick={this.vote()} btnText="vote" />
          <Button handleClick={this.getNext()} btnText="next anecdote" />
        </div>
        <h1>anecdote with most votes:</h1>
        <div>{this.props.anecdotes[this.state.favorite]}</div>
        <div>has {this.state.votes[this.state.favorite]} votes</div>
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