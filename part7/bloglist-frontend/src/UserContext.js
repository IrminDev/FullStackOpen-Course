import { createContext, useReducer, useContext } from "react"

const userReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return action.data
        case "CLEAR_USER":
            return null
        default:
            return state
    }
}

const UserContext = createContext()

export const useUserValue = () => {
    const userAndDispatcher = useContext(UserContext)
    return userAndDispatcher.user
}

export const useUserDispatch = () => {
    const userAndDispatcher = useContext(UserContext)
    return userAndDispatcher.dispatch
}

export const UserContextProvider = ({ children }) => {
    const [user, dispatch] = useReducer(userReducer, null)
    
    const value = { user, dispatch }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}