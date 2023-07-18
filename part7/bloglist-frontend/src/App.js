import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Message from "./components/Message";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useNotificationDispatch } from "./NotificationContext";

const App = () => {
  const dispatch = useNotificationDispatch();
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userLog = await loginService.login({
        username,
        password,
      });
      setUser(userLog);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(userLog));
      setUsername("");
      setPassword("");
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
      setUser(null);
      window.localStorage.removeItem("loggedBlogappUser");
    } catch (exception) {
      dispatch({ type: "SET_NOTIFICATION", data: "Wrong credentials" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" })
      }, 5000);
    }
  };

  const handleCreate = async (blog) => {
    try {
      const blogCreated = await blogService.create(blog);
      setBlogs(blogs.concat(blogCreated));
      dispatch({ type: "SET_NOTIFICATION", data: "Blog created" })
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" })
      }, 5000);
    } catch (exception) {
      dispatch({ type: "SET_NOTIFICATION", data: "Wrong credentials" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    }
  };

  const handleLike = async (blog) => {
    try {
      await blogService.update(blog);
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
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
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
  };

  const blogsForm = () => (
    <div>
      <h2>blogs</h2>
      <Togglable key="toggle" buttonLabel="new blog">
        <BlogForm createBlog={handleCreate} />
      </Togglable>

      <div>
        <p>{user.name} logged in</p>{" "}
        <button onClick={handleLogout}>logout</button>
      </div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          removeBlog={removeBlog}
          owner={user.username}
        />
      ))}
    </div>
  );

  return (
    <div>
      <Message />
      {user === null && loginForm()}
      {user !== null && blogsForm()}
    </div>
  );
};

export default App;
