import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        clearNotification(state, action) {
            return ''
        },
        setValue(state, action) {
            return action.payload
        }
    }
})

export const setNotification = ({message, time}) => {
    return dispatch => {
        dispatch(setValue(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time*1000)
    }
}

export const { clearNotification, setValue } = notificationSlice.actions
export default notificationSlice.reducer