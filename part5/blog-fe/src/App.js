import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/Login'
import blogService from './services/blogs'
import loginService from './services/loginService'
import Notification from './components/Notification'
import Form from './components/Form'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [autoUpdate, setAutoUpdate] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userBlogData')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFromRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('userBlogData', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({
        text: `Welcome ${user.name}`,
        type: 'success',
      })
    } catch (exception) {
      setMessage({
        text: 'wrong username or password',
        type: 'error',
      })
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        handleSubmit={handleLogin}
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </Togglable>
  )


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [autoUpdate])
  
  useEffect(() => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)}, [message])

  const welcomeUser = () => (
    <div>
      {user.name} logged in <button onClick={logout}>Logout</button>
    </div>
  )

  const logout  = async () => {
    window.localStorage.removeItem('userBlogData')
    setMessage({
      text: 'Logout success',
      type: 'success',
    })
    setUser(null)
  }


  const blogForm = () => (
    <div>
      <Togglable buttonLabel="New Blog" ref={blogFromRef}>
        <Form newBlogForm={newBlogForm} />
      </Togglable>
    </div>
  )

  const upvote = async (id, likes) => {
    await blogService.update({
      id: id,
      likes: likes + 1,
    })
    setAutoUpdate(5000)
  }

  const newBlogForm = async (blogObject) => {
    try {
      blogFromRef.current.toggleVisibility()
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      setMessage({
        text: `a new blog ${response.title} by ${response.author} added`,
        type: 'success',
      })
    } catch (exception) {
      setMessage({
        text: `${exception}`,
        type: 'error',
      })
    }
  }

  const deletion = async (blog) => {
    const result = window.confirm(`Remove ${blog.title} by ${blog.author}`)
    if (result) {
      await blogService.del({
        id: blog.id,
      })
      setAutoUpdate(5000)
    }
  }

  return (
    <div>
      <Notification message={message} />
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          {welcomeUser()}
          {blogForm()}
          {blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1)) &&
            blogs.map((blog,j) => (
              <Blog
              currentUser={user}
              key={j}
                blog={blog}
                upvote={upvote}
                deletion={deletion}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
