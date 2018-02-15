const filterReducer = (store = '', action) => {
  switch (action.type) {
    case 'APPLY':
      return action.filter
    default:
      return store
  }
}

export const filterSetting = (filter) => {
  return {
    type: 'APPLY',
    filter: filter.toLowerCase()
  }
}

export default filterReducer