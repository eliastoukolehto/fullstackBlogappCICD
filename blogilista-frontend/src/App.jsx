import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notiflication from './components/Notiflication'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(
        blogs.reverse().sort((a, b) => b.likes - a.likes)
      )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat({ ...returnedBlog, user }))

        setErrorMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const updateBlog = (blogObject) => {
    blogService
      .update(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(
          blog => blog.id.toString() === returnedBlog.id.toString()
            ? { ...returnedBlog, user: blog.user }
            : blog
        ))
      })
  }

  const removeBlog = (blogObject) => {
    if (window.confirm(`remove blog ${blogObject.title} ?`)){
      blogService
        .remove(blogObject)
      setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
    }
  }

  return (
    <div>
      <h1>Bloglist App</h1>
      <Notiflication message={errorMessage}/>
      <br />
      {!user &&
      <div>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername = {setUsername}
          password = {password}
          setPassword={setPassword}
        />
      </div>
      }
      {user && <div>
        <p>{user.name} logged in
          <button onClick={handleLogout}> Logout </button></p>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        <br />
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            user={user}
            removeBlog={removeBlog}
          />
        )}
      </div>}

    </div>

  )

}



export default App

