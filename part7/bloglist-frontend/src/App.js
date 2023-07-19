import { useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Message from "./components/Message";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useNotificationDispatch } from "./NotificationContext";
import { useQuery } from "react-query"
import { useUserDispatch, useUserValue } from "./UserContext";

const App = () => {
  const dispatchUser = useUserDispatch();
  const user = useUserValue();
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const userStored = JSON.parse(loggedUserJSON);
      dispatchUser({ type: "SET_USER", data: userStored });
      blogService.setToken(userStored.token);
    }
  }, []);

  const dispatch = useNotificationDispatch();
  
  const resultBlogs = useQuery("blogs", blogService.getAll, {
    retry: true,
    refetchOnWindowFocus: true,
  })
  
  
  if (resultBlogs.isLoading) {
    return <div>Loading...</div>
  }
  
  if(resultBlogs.isError) {
    return <div>Error: {resultBlogs.error.message}</div>
  }
  
  const blogs = resultBlogs.data;
  
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userLog = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value,
      });
      dispatchUser({ type: "SET_USER", data: userLog });
      event.target.username.value = "";
      event.target.password.value = "";
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(userLog));
      blogService.setToken(userLog.token);
    } catch (exception) {
      dispatch({ type: "SET_NOTIFICATION", data: "Wrong credentials" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" })
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      dispatchUser({ type: "CLEAR_USER"});
      window.localStorage.removeItem("loggedBlogappUser");
    } catch (exception) {
      dispatch({ type: "SET_NOTIFICATION", data: "Wrong credentials" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" })
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        username
        <input
          type="text"
          id="username"
          name="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          id="password"
          name="password"
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );

  const blogsList = (blogsList) => (
    <div>
      <h2>blogs</h2>
      <Togglable key="toggle" buttonLabel="new blog">
        <BlogForm />
      </Togglable>

      <div>
        <p>{user.name} logged in</p>{" "}
        <button onClick={handleLogout}>logout</button>
      </div>
      {blogsList.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          owner={user.username}
        />
      ))}
    </div>
  );

  return (
    <div>
      <Message />
      {user === null && loginForm()}
      {user !== null && blogsList(blogs)}
    </div>
  );
};

export default App;
