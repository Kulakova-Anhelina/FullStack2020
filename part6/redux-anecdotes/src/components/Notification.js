import React from 'react'
import { connect } from 'react-redux'



const Notification = (props) => {


  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: '40px'
  }

  return (
    <> {
     props.notification.length > 0 && (
        <div style={style}>
          {props.notification}
        </div>
      )
    }
     <div/>
    </>




  )

}
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification