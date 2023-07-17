import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'CLEAR_NOTIFICATION':
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
    const notificationAndDispatcher = useContext(NotificationContext)
    return notificationAndDispatcher.notification
}

export const useNotificationDispatch = () => {
    const notificationAndDispatcher = useContext(NotificationContext)
    return notificationAndDispatcher.dispatch
}

export const NotificationContextProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, null)
    
    const value = { notification, dispatch }
    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    )
}


export default NotificationContext
