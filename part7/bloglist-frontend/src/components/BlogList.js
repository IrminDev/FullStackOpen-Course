import React from "react"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import { Link } from "react-router-dom"

const BlogList = ({blogsList}) => {
  return (
    <div className=" w-full flex-col items-center justify-center ">
        <Togglable key="toggle" buttonLabel="new blog">
            <BlogForm />
        </Togglable>
        {blogsList.map((blog) => (
            <div key={blog.id}>
                <Link className=" font-semibold text-slate-700" to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
            </div>
        ))}
    </div>
  )
}

export default BlogList