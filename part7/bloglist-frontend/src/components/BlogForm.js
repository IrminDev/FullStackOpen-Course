import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNotificationDispatch } from "../NotificationContext";
import blogService from "../services/blogs";

function BlogForm() {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      queryClient.setQueryData("blogs", [...blogs, newBlog]);
    }
  })

  const addBlog = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";
    newBlogMutation.mutate({ title, author, url });
    dispatch({ type: "SET_NOTIFICATION", data: `a new blog ${title} by ${author} added` });
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };
  return (
    <form onSubmit={addBlog} className="form">
      <div>
        title:
        <input
          type="text"
          id="title"
          name="title"
        />
      </div>
      <div>
        author:
        <input
          type="text"
          id="author"
          name="author"
        />
      </div>
      <div>
        URL:
        <input
          type="text"
          id="url"
          name="url"
        />
      </div>

      <button id="create-button" type="submit">
        new blog
      </button>
    </form>
  );
}

export default BlogForm;
