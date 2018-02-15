import React from 'react'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { notificationSetting, notificationClearing } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleVote = (id, content) => {
    this.props.store.dispatch(anecdoteVoting(id))
    this.props.store.dispatch(notificationSetting(`you voted '${content}'`))
    setTimeout(() => {
      this.props.store.dispatch(notificationClearing())
    }, 5000)
  }

  render() {
    const { anecdotes, filter } = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes
          .sort((a, b) => b.votes - a.votes)
          .filter(anecdote => anecdote.content.toLowerCase().includes(filter))
          .map(anecdote =>
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

export default AnecdoteList
