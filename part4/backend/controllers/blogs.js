const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../model/blog')
const User = require('../model/user')
const {blogsInDb} = require("../tests/test_helper");

blogsRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
        res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
})
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id){
        return response.status(401).json({error: 'Invalid token'})
    }

    const user = await User.findById(decodedToken.id);

const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
})

   if(!blog.title || !blog.author){
       return response.status(400).json('Blog must have title and author!')
   }


   const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save();
    response.status(201).json(savedBlog)

  })

blogsRouter.delete('/:id', async (req, res) => {

    const blog = await Blog.findById(req.params.id);

    const user = await User.findById(blog.user)

    if(blog.user.toString() === user._id.toString()){
        await Blog.findByIdAndRemove(req.params.id);
        return res.status(204).end();
    } else {
        return res.status(401).json({error: 'Invalid token'})
    }

})

blogsRouter.put('/:id', async (req, res) => {
    const id = req.params.id;

    const blog = await Blog.findById(id);

    const updateBlog = await Blog.findByIdAndUpdate(id, {likes: req.body.likes});
    res.json(updateBlog);
})
  module.exports = blogsRouter