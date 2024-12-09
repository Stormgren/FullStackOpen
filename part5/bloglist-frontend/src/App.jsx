import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/Login'
import blog from "./components/Blog";
import axios from "axios";
import BlogForm from "./components/BlogForm.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
const [message, setMessage] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs =>
        setBlogs( blogs )
    )
      console.log(user)
  }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON);
            setUser(user)
            blogService.setToken(user.token)
        }
    }, []);

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await login({
        username, passwordHash: password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (error) {
      setErrorMessage('Wrong Credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000)
    }

  }

  const loginForm = () => (
      <form onSubmit={handleLogin}>
          Username: <input type="text" value={username} name="Username"
                           onChange={({target}) => setUsername(target.value)}/>
          <br/>
          Password: <input type="password" value={password} name="Password"
                           onChange={({target}) => setPassword(target.value)}/>
          <br/>
          <button type="submit">Log in</button>
      </form>
  )

    const logoutHandler = () => {
       window.localStorage.removeItem('loggedUser')
        setUser(null)
    }
  
    const blogsList = () => (
        <div>
            <h2>Blogs</h2>
            <h1>Logged in as {user.name}</h1>
            <button onClick={() => logoutHandler()}>Log out</button>
            <BlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage}  />
            {blogs.map(blog => (
                <Blog key={blog.id} blog={blog}/>
            ))}
        </div>
    )

    return (
        <div>
            {errorMessage}
            {message}
            {user === null ? (
                loginForm()) : (

                blogsList()
            )}


        </div>
    )
}

export default App