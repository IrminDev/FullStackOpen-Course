import { useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Message from "./components/Message";
import { useNotificationDispatch } from "./NotificationContext";
import { useQuery } from "react-query"
import { useUserDispatch, useUserValue } from "./UserContext";
import Header from "./components/Header";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { Link, Route, Routes } from "react-router-dom";
import BlogDetail from "./components/BlogDetail";
import BlogList from "./components/BlogList";

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

  return (
    <div>
      <Message />
      <Header />
      {user === null && loginForm()}
      {user !== null ? (
        <>
        <div>
          <Link to="/">blogs</Link>
          <Link to="/users">users</Link>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
        <Routes>
          <Route path="/" element={<BlogList blogsList={blogs} />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
        </Routes>
        </>
      ) : (
        <div>
        </div>
      )}
    </div>
  );
};

export default App;
