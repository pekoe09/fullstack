import React from 'react'
import ConnectedNotification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

class App extends React.Component {

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Filter store={this.props.store} />
        <ConnectedNotification store={this.props.store} />
        <AnecdoteList store={this.props.store} />
        <AnecdoteForm store={this.props.store} />
      </div>
    )
  }
}

export default App