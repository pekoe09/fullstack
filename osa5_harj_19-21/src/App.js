import React from 'react';

class App extends React.Component {

  vote = (id) => () => {
    console.log("Voting on ", id)
    this.props.store.dispatch({
      type: 'VOTE',
      data: { id }
    })
  }

  create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.props.store.dispatch({
      type: 'ADD',
      data: {
        content,
        votes: 0
      }
    })
    event.target.anecdote.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.create}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default App