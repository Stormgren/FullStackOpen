import Togglable from "./Togglable.jsx";


const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
      <div style={blogStyle}>

        {blog.title} <Togglable buttonLabel='Show'>
          Author: {blog.author}<br/>
          Url: {blog.url}<br/>
          Likes: {blog.likes}<br/>
        </Togglable>
      </div>
  )
}

export default Blog