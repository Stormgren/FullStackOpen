const config = require('./utils/config');
// require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

/*
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
*/
const Blog = require('./model/blog')

const mongoUrl = process.env.MONGO_URI
// mongoose.connect(mongoUrl)
mongoose.connect(config.MONGO_URI);

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

// const PORT = process.env.PORT || 3003
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})