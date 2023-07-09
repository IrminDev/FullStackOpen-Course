import React from 'react'

const Notification = ({ type, message }) => {
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div>
            {type === 'error' ?
            <div style={errorStyle}>{message}</div> :
            type === 'notification' ? 
            <div style={notificationStyle}>{message}</div> : <></>}
        </div>
    )
}

export default Notification