import React, { useEffect } from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [login, result] = useMutation(LOGIN)

    useEffect(() => {
        if(result.data){
            const token = result.data.login.value
            props.setToken(token)
            console.log(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [result.data]) // eslint-disable-line

    const loginFun = (event) => {
        event.preventDefault()
        login({ variables: { username, password } })
        setUsername('')
        setPassword('')
    }

    if(!props.show){
        return null
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={loginFun}>
                <div>
                    username 
                    <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                    password
                    <input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                <button type='submit'>login</button>
                </div>
            </form>   
        </div>
    )
}

export default LoginForm