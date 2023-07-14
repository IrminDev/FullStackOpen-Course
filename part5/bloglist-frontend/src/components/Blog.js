import Togglable from "./Togglable"

const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
    <Togglable buttonLabel="view">
      <p>{blog.url}</p>
      <p>{blog.likes} <button>like</button></p>
      <p>{blog.author}</p>
    </Togglable>
  </div>  
)

export default Blog