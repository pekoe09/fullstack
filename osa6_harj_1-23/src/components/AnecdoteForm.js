import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notificationSetting, notificationClearing } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.store.dispatch(anecdoteCreation(content))

    e.target.anecdote.value = ''

    this.props.store.dispatch(notificationSetting(`you added '${content}'`))
    setTimeout(() => {
      this.props.store.dispatch(notificationClearing)
    }, 5000)
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm
