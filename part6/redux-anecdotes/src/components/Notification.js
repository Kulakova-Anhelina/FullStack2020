import React from 'react'
import { useSelector } from 'react-redux'



const Notification = () => {


  const notification = useSelector(state => state.notification)

  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: '40px'
  }

  return (
    <> {
     notification.length > 0 && (
        <div style={style}>
          {notification.notification}
        </div>
      )
    }
     <div/>
    </>




  )

}
export default Notification