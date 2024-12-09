
import {useEffect, useState} from "react";


const Blog = ({ blog }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [btnLabel, setBtnLabel] = useState('show')

    const showWhenVisible = {display: isVisible ? '' : 'none'}
    
    useEffect(() => {
        if(isVisible){
            setBtnLabel('hide')
        } else {
            setBtnLabel('show')
        }
    }, [isVisible]);
    const toggleVisibility = () => {
        setIsVisible(!isVisible)

    }

    const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
      <div style={blogStyle}>

          {blog.title}  <button onClick={toggleVisibility}>{btnLabel}</button>
      <div style={showWhenVisible}>
          Author: {blog.author}<br/>
          Url: {blog.url}<br/>
          Likes: {blog.likes}<br/>

      </div>
      </div>
  )
}

export default Blog