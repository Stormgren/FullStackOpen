import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/Login'
import blog from "./components/Blog";
import axios from "axios";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

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
    const createNewBlog = async (e) => {
        e.preventDefault();

        const blogObject = {
            title,
            author,
            url
        }

            blogService.create(blogObject).then(newBlog => {
                    setBlogs(blogs.concat(newBlog))
                    setTitle('')
                    setAuthor('')
                    setUrl('')
                }
            )
       
    }

    const addNewBlog = () => (
        <form onSubmit={createNewBlog}>
            Title: <input type="text" value={title} name="Title"
                          onChange={({target}) => setTitle(target.value)}/>
            <br/>
            Author: <input type="text" value={author} name="Author"
                           onChange={({target}) => setAuthor(target.value)}/>
            <br/>
            Url: <input type="text" value={url} name="Url"
                        onChange={({target}) => setUrl(target.value)}/>
            <br/>
            <button type="submit">Add new Blog</button>
        </form>
    )

    const blogsList = () => (
        <div>
            <h2>Blogs</h2>
            <h1>Logged in as {user.name}</h1>
            <button onClick={() => logoutHandler()}>Log out</button>
            {addNewBlog()}
            {blogs.map(blog => (
                <Blog key={blog.id} blog={blog}/>
            ))}
        </div>
    )

    return (
        <div>
            {errorMessage}
            {user === null ? (
                loginForm()) : (

                blogsList()
            )}


        </div>
    )
}

export default App