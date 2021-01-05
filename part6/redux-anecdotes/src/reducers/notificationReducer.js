const initialState = ''

const notificationReducer = (state = initialState, action) => {
  console.log('state notification: ', state)
  console.log('action notification', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':

      return action.notification
    case 'REMOVE_NOTIFICATION':
      return initialState
    default:
      return state
  }

}

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}


export const manageNotification = (notification, time) => {
  return async dispatch => {

    dispatch(setNotification(notification))

    window.setTimeout(() => {
      dispatch(removeNotification(notification))
    }, time)
    window.clearTimeout()
  }

}

export default notificationReducer