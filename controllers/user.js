const express = require('express');
const userRouter = express.Router();

// models
const User = require("../models/user");

userRouter.get('/u/:username', (req, res) => {
    var currentUser = req.user;

    User.find({
        username: req.params.username,
    })
    .populate('posts')
    .populate('comments')
    .then(user => {
        res.render('user-show', {
            user,
            currentUser,
        })
    }).catch(e => {
        console.log(e);
    })
})

module.exports = userRouter;
