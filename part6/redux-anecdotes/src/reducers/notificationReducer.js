const initialState = {
  notification: '',

}


const notificationReducer = (state = initialState, action) => {
  console.log('state notification: ', state)
  console.log('action notification', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { notification: action.data.notification }
    case 'REMOVE_NOTIFICATION':
      return initialState
    default:
      return state
  }

}

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      notification,
      visible: true
    }
  }
}

export const removeNotification = (notification) => {
  return {
    type: 'REMOVE_NOTIFICATION',
    data: {
      notification: '',
      visible: false
    }
  }
  }


  export const manageNotification = (notification, time) =>{
    return async dispatch => {
      dispatch(setNotification(notification))
      setTimeout(() => {
        dispatch(removeNotification(notification))
       }, time)

    }
  }

export default notificationReducer