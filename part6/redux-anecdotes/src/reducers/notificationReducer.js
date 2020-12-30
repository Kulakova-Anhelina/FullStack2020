
const initialState = {
  notification: '',
  visible: false
}



const notificationReducer = (state = initialState, action) => {
  console.log('state notification: ', state)
  console.log('action notification', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { notification: action.data.notification, visible: true }
    case 'REMOVE_NOTIFICATION':
      return { notification: '', visible: false }
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


export default notificationReducer