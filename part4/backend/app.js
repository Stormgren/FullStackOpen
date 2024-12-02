const config = require('./utils/config');
const express = require('express')
require('express-async-errors');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const userRouter = require("./controllers/users");
mongoose.set('strictQuery', false)

mongoose.connect(config.MONGO_URI).then(()=> {
  logger.info('Connected to MongoDB')
}).catch(error => {
  logger.error('error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)
app.use('/api/blogs',blogsRouter)
app.use('/api/users', userRouter)

module.exports = app