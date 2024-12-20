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
const loginRouter = require("./controllers/login");
mongoose.set('strictQuery', false)

mongoose.connect(config.MONGO_URI).then(()=> {
  logger.info('Connected to MongoDB')
}).catch(error => {
  logger.error('error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app