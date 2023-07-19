import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "react-query";
import { useNotificationDispatch } from "../NotificationContext";
import blogService from "../services/blogs"
import usersService from "../services/user"

import { useState } from "react";

const BlogDetail = () => {
  const id = useParams().id
  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getOne(id).then((blog) => {setBlog(blog)})
  }, []);
  
  useEffect(() => {
    if(blog?.user) {
      usersService.getOne(blog.user).then((user) => {setUser(user)})
    }
  }, [blog]);

  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();
  console.log(user);

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      const updatedBlogs = blogs.map((blog) => {
        return blog.id === newBlog.id ? newBlog : blog;
      });
      queryClient.setQueryData("blogs", updatedBlogs);
    }
  });

  const likeBlog = () => {
    const blogObject = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    try {
      updateBlogMutation.mutate(blogObject);
    } catch (exception) {
      dispatch({ type: "SET_NOTIFICATION", data: "Wrong credentials" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" })
      }, 5000);
    }
  };

  const commentBlog = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    const blogObject = {
      ...blog,
      comments: blog.comments.concat(comment),
      user: blog.user.id
    }
    try {
      updateBlogMutation.mutate(blogObject);
      setBlog(blogObject);
    } catch (exception) {
      dispatch({ type: "SET_NOTIFICATION", data: "Wrong credentials" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" })
      }, 5000);
    }
  }

  if(!blog) return null;

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <p>{blog.url}</p>
      <p>{blog.likes} 
        <button onClick={likeBlog}>like</button>
      </p>
      <p>added by {user?.name}</p>
      <h2>Comments</h2>
      <form onSubmit={commentBlog}>
        <input type="text" name="comment" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, i) => {
          return <li key={i}>{comment}</li>
        })}
      </ul>
    </div>
  )
}

export default BlogDetail