const notificationReducer = (state = '', action) => {
  console.log('state notification: ', state)
  console.log('action notification', action)
  switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.notification
      default:
        return state
    }

}

export const notification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}

export default notificationReducer