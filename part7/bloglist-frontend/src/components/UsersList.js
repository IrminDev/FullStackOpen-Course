import { useEffect, useState } from "react"
import usersService from "../services/user"
import { Link } from "react-router-dom"

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        usersService.getAll().then(users => setUsers(users))
    }, [])
    
    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                {users.map(user => <tr key={user.id}>
                        <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                        <td>{user.blogs.length}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default UsersList