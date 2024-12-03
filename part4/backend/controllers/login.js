const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router();
const User = require('../model/user')

loginRouter.post('/', async (req, res) => {
    const {username, passwordHash} = req.body;

    const user = await User.findOne({ username });
    console.log(user)
    console.log(req.body)

    const bc = await bcrypt.compare(passwordHash, user.passwordHash)
    console.log(bc)
    const passwordCorrect = user === null
        ? false
        : bc

    if(!(user && passwordCorrect)){
        return res.status(401).json({error: 'Username or password invalid'})
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).send({token, username: user.username, name: user.name})
})

module.exports = loginRouter;