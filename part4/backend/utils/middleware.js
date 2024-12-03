const jwt = require('jsonwebtoken')
const logger = require('./logger')
const {request} = require("express");
const User = require('../model/user')

const requestLogger = (req, res, next) => {
    logger.info("Method", req.method)
    logger.info("Path", req.path)
    logger.info("Body", req.body)
    logger.info("---")
    next()
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')){
        req.token = authorization.replace('Bearer ', '')
    }
    console.log(authorization)
    next();
}

const userExtractor = async (req, res, next) => {

    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    console.log('Token ' + decodedToken +  ' Non decoded ' +  req.token);
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'Token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    if (!user) {
        return res.status(404).json({ error: 'user not found' })
    }
    req.user = user

    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: "unknown endpoint"})
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if(error.name === 'CastError'){
        return res.status(400).send({
            error: 'malformatted id'
        })
    } else if (error.name === 'ValidationError'){
        return res.status(400).json({
            error: error.message
        })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')){
        return res.status(400).json({
            error: 'expected `username` to be unique'
        });
    } else if (error.name === 'JsonWebTokenError'){
        return res.status(401).json({
            error: 'Invalid token'
        })
    } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
        error: 'token expired'
    })
}

    next(error)
}

module.exports = {
    requestLogger,
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler
}