import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/Login'
import blog from "./components/Blog";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
        setBlogs( blogs )
    )
      console.log(user)
  }, [])


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await login({
        username, passwordHash: password
      })

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong Credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000)
    }
    console.log('Logging in with: ', username, password)
  }

  const loginForm = () => {
      <form onSubmit={handleLogin}>
          Username: <input type="text" value={username} name="Username"
                           onChange={({target}) => setUsername(target.value)}/>
          <br/>
          Password: <input type="password" value={password} name="Password"
                           onChange={({target}) => setPassword(target.value)}/>
          <br/>
          <button type="submit">Log in</button>
      </form>
  }

    /*<div>


        <h2>blogs</h2>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
        )}
    </div>*/


  return (
      <div>
          {user === null && loginForm()}
          {user !== null && <p>{user.name} logged in</p>}

          <form onSubmit={handleLogin}>
              Username: <input type="text" value={username} name="Username"
                               onChange={({target}) => setUsername(target.value)}/>
              <br/>
              Password: <input type="password" value={password} name="Password"
                               onChange={({target}) => setPassword(target.value)}/>
              <br/>
              <button type="submit">Log in</button>
          </form>
      </div>
  )
}

export default App