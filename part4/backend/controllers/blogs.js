const blogsRouter = require('express').Router()
const Blog = require('../model/blog')

blogsRouter.get("/", (req, res) => {
    Blog.find({}).then(blogs => {
        res.json(blogs)
    })
})


blogsRouter.post('/', (request, response) => {
    const body = request.body
    
const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
}) 

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      }).catch(error => next(error))
  })

  module.exports = blogsRouter