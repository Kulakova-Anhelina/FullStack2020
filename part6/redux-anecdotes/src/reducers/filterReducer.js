
const initialState = ''

const filterReducer = (state = initialState, action ) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_FILTER':
      return   action.filter
    default:
      return state;
  }
};

export const setFilter = filter => {
  return {
    type: 'SET_FILTER', filter: filter
}
}
export default filterReducer