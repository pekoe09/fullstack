import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  switch (action.type) {
    case 'VOTE': {
      return store.map(a => a.id === action.updatedAnecdote.id ? action.updatedAnecdote : a)
    }
    case 'CREATE':
      return store.concat(action.newAnecdote)
    case 'INIT':
      return action.anecdotes
    default:
      return store
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      updatedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      anecdotes
    })
  }
}

export default anecdoteReducer