

const initialState = {
  keyword: '',
}


const filterReducer = (state = initialState, action ) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SEARCH_TEXT':

      return action.keyword
    default:
      return state;
  }
};

export const filterChange = (keyword) => {
  return {
    type: 'SEARCH_TEXT',
    keyword: keyword




  }
}


export default filterReducer