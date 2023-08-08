import { useContext } from "react"
import NotificationContext from "./NotificationContext"

const Notification = () => {
  const [notification, dispatchNotification] = useContext(NotificationContext)

  if (notification) {
    setTimeout(() => {
      dispatchNotification({ type: 'RESET' })
    }, 5000)
  }
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
      <p>{notification}</p>
    </div>
  )
}

export default Notification
