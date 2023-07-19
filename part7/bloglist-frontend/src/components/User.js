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
        <h2 className=" font-semibold text-3xl text-center text-slate-600">{user.name}</h2>
        <h3 className=" font-semibold uppercase text-slate-950 mb-2">added blogs</h3>
        <ul>
          {user.blogs?.map(blog => <li className=" text-slate-700 font-medium mt-2 " key={blog.id}>{blog.title}</li>)}
        </ul>
    </div>
  )
}

export default User