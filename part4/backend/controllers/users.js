const userRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require('../model/user');


userRouter.post('/', async(req, res) => {
    const {username, name, passwordHash} = req.body;

    if(passwordHash === undefined){
        return res.status(400).json({error: "Password is required"})
    }

    if(username === undefined){
        return  res.status(400).json({error: 'Username is required'})
    }

    if(passwordHash.length < 3){
        return res.status(400).json({error: 'Password must be at least 3 characters long'})
    }

    if(username.length < 3) {
        return res.status(400).json({error: 'Username must be at least 3 characters long'});
    }

    const saltRounds = 10;
    const password = await bcrypt.hash(passwordHash, saltRounds);


    const user = new User({
        username,
        name,
        passwordHash: password
    })

    const savedUser = await user.save();

    res.status(201).json(savedUser);
})

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1})
    res.json(users);
})

module.exports = userRouter;