const anecdoteReducer = (store = [], action) => {
  switch (action.type) {
    case 'VOTE': {
      const old = store.filter(a => a.id !== action.id)
      const voted = store.find(a => a.id === action.id)
      return [...old, { ...voted, votes: voted.votes + 1 }]
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

export const anecdoteVoting = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT',
    data
  }
}

export default anecdoteReducer