import React from 'react'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { notificationSetting, notificationClearing } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  handleVote = (id, content) => {
    this.props.anecdoteVoting(id)
    this.props.notificationSetting(`you voted '${content}'`)
    setTimeout(() => {
      this.props.notificationClearing()
    }, 5000)
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
              <button onClick={() => { this.handleVote(anecdote.id, anecdote.content) }}>
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
  { anecdoteVoting, notificationSetting, notificationClearing }
)(AnecdoteList)

export default ConnectedAnecdoteList
