import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const userLog = await loginService.login({
        username, password,
      })
      setUser(userLog)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userLog))
      setUsername('')
      setPassword('')
      blogService.setToken(userLog.token)
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try{
      setUser(null)
      window.localStorage.removeItem('loggedBlogappUser')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  
  const handleCreate = async (event) => {
    event.preventDefault()
    try{
      const blog = await blogService.create({
        title, author, url,
      })
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogsForm = () => (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel="new blog">
        <form onSubmit={ handleCreate }>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="title"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            URL:
            <input
              type="text"
              value={url}
              name="title"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>

          <button type="submit">new blog</button>
        </form>
      </Togglable>

      <div>
        <p>{user.name} logged in</p> <button onClick={handleLogout}>logout</button>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    
    <div>
      <Message message={message} />
      { user === null && loginForm() }
      { user !== null && blogsForm() }
    </div>
  )

}

export default App