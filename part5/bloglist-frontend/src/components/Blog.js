import Togglable from "./Togglable"
import { useState } from "react"

const Blog = ({blog, handleLike}) => {
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

  return (
    <div>
      {blog.title} {blog.author}
      <Togglable buttonLabel="view">
        <p>{blog.url}</p>
        <p>{likes} <button onClick={likeBlog}>like</button></p>
        <p>{blog.author}</p>
      </Togglable>
    </div>  
  )
}

export default Blog