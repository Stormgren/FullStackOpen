import blogService from '../services/blogs'
import {useState} from "react";

const BlogForm = ({blogs, setBlogs, setMessage }) => {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const createNewBlog = async (e) => {
        e.preventDefault();

        const blogObject = {
            title,
            author,
            url
        }
        try {
            blogService.create(blogObject).then(newBlog => {
                    setBlogs(blogs.concat(newBlog))
                    setTitle('')
                    setAuthor('')
                    setUrl('')
                }
            )
        } catch(e) {
            setMessage(e)
            setTimeout(() => {
                setMessage(null);
            }, 5000)
        }
        setMessage(`${title} by ${author} has been added to the blog list`)
        setTimeout(() => {
            setMessage(null);
        }, 5000)
    }
    return (
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
}

export default BlogForm;