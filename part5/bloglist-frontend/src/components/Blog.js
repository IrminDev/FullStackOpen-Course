import Togglable from "./Togglable"
import { useState } from "react"

const Blog = ({blog, handleLike, removeBlog, owner}) => {
  const [likes, setLikes] = useState(blog.likes);

  const likeBlog = () => {
    const blogObject = {
      ...blog,
      likes: likes + 1,
      user: blog.user.id
    }
    handleLike(blogObject)
    setLikes(likes + 1)
  }

  const remove = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div>
      {blog.title} {blog.author}
      <Togglable buttonLabel="view">
        <p>{blog.url}</p>
        <p>{likes} <button onClick={likeBlog}>like</button></p>
        <p>{blog.author}</p>
        
        { owner === blog.user?.username ? <button onClick={remove}>remove</button> : null}
      </Togglable>
    </div>  
  )
}

export default Blog