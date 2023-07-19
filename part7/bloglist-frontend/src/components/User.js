import React from "react"
import { useParams } from "react-router-dom"
import usersService from "../services/user"
import { useEffect, useState } from "react"

const User = () => {
  const id = useParams().id
  const [user, setUser] = useState(null);

  useEffect(() => {
      usersService.getOne(id).then(users => setUser(users))
  }, [])

  if(!user) return null

  console.log(user)

  return (
    <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs?.map(blog => <li key={blog.id}>{blog.title}</li>)}
        </ul>
    </div>
  )
}

export default User