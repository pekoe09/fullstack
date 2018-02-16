const anecdoteReducer = (store = [], action) => {
  switch (action.type) {
    case 'VOTE': {
      return store.map(a => a.id === action.data.id ? action.data : a)
    }
    case 'CREATE':
      return store.concat(action.data)
    case 'INIT':
      return action.data
    default:
      return store
  }
}

export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const anecdoteVoting = (data) => {
  return {
    type: 'VOTE',
    data
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT',
    data
  }
}

export default anecdoteReducer