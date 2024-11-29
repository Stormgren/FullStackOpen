const blogsRouter = require('express').Router()
const Blog = require('../model/blog')

blogsRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({})
        res.json(blogs)

})


blogsRouter.post('/', async (request, response) => {
    const body = request.body
    
const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
})

   if(!blog.title || !blog.author){
       return response.status(400).json('Blog must have title and author!')
   }
        const savedBlog = await blog.save()
               response.status(201).json(savedBlog)



  })

  module.exports = blogsRouter