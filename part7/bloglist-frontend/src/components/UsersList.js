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
            <h2 className=" font-bold text-slate-700 text-lg">Users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                {users.map(user => <tr key={user.id}>
                        <td className=" text-slate-600 font-semibold pr-5"><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                        <td className=" text-sky-700 font-bold">{user.blogs.length}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default UsersList