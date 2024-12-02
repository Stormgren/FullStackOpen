const userRouter = require("express").Router();
const User = require('../model/user');
const bcrypt = require("bcryptjs");

userRouter.post('/', async(req, res) => {
    const {username, name, passwordHash} = req.body;

    const saltRounds = 10;
    const password = bcrypt.hash(passwordHash, saltRounds);

    const user = new User({
        username,
        name,
        password
    })

    const savedUser = await user.save();

    res.status(201).json(savedUser);
})

userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users);
})
module.exports = userRouter;