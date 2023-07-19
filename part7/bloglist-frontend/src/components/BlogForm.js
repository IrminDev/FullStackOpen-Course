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
    <form onSubmit={addBlog} className="form w-[80%] flex-col items-center justify-around">
      <div className=" w-full font-semibold mt-3">
        title:
        <input
          type="text"
          id="title"
          name="title"
          className="w-[80%] ml-4 border-2 bg-slate-300 border-slate-700 rounded-md"
        />
      </div>
      <div className=" w-full font-semibold mt-3">
        author:
        <input
          type="text"
          id="author"
          name="author"
          className="w-[80%] ml-4 border-2 bg-slate-300 border-slate-700 rounded-md"
        />
      </div>
      <div className=" w-full font-semibold mt-3">
        URL:
        <input
          type="text"
          id="url"
          name="url"
          className="w-[80%] ml-4 border-2 bg-slate-300 border-slate-700 rounded-md"
        />
      </div>

      <button className=" bg-slate-800 py-2 px-3 mt mt-3 text-white rounded-xl w-[20%]" id="create-button" type="submit">
        new blog
      </button>
    </form>
  );
}

export default BlogForm;
