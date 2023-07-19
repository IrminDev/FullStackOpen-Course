import Togglable from "./Togglable";
import { useMutation, useQueryClient } from "react-query";
import { useNotificationDispatch } from "../NotificationContext";
import blogService from "../services/blogs";

const Blog = ({ blog, owner }) => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      const updatedBlogs = blogs.map((blog) => {
        return blog.id === newBlog.id ? newBlog : blog;
      });
      queryClient.setQueryData("blogs", updatedBlogs);
    }
  });

  const deleteBlogMutation = useMutation(blogService.remove, {
    onSuccess: (deletedBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      const updatedBlogs = blogs.filter((blog) => {
        return blog.id !== deletedBlog.id;
      });
      queryClient.setQueryData("blogs", updatedBlogs);
    }
  })

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

  const remove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        deleteBlogMutation.mutate(blog.id);
        dispatch({ type: "SET_NOTIFICATION", data: "Blog removed" })
        setTimeout(() => {
          dispatch({ type: "CLEAR_NOTIFICATION" })
        }, 5000);
      } catch (exception) {
        dispatch({ type: "SET_NOTIFICATION", data: "Wrong credentials" });
        setTimeout(() => {
          dispatch({ type: "CLEAR_NOTIFICATION" })
        }, 5000);
      }
    }
  };

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <Togglable buttonLabel="view">
        <p className="url">{blog.url}</p>
        <p className="likes">
          {blog.likes} <button onClick={likeBlog}>like</button>
        </p>
        <p>{blog.author}</p>

        {owner === blog.user?.username ? (
          <button onClick={remove}>remove</button>
        ) : null}
      </Togglable>
    </div>
  );
};

export default Blog;
