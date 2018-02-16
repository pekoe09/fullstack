import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  handleVote = async (anecdote) => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    this.props.voteAnecdote(votedAnecdote)
    this.props.notify(`you voted '${anecdote.content}'`, 5)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotesToShow.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => { this.handleVote(anecdote) }}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes
    .filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter))
    .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (store) => {
  return {
    anecdotesToShow: anecdotesToShow(store.anecdotes, store.filter)
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { voteAnecdote, notify }
)(AnecdoteList)

export default ConnectedAnecdoteList
