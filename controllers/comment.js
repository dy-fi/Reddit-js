const express = require('express');
const commentRouter = express.Router();

// models
const Post = require('../models/posts')
const Comment = require('../models/comments')
const User = require('../models/user')

commentRouter.post("/posts/:postId/comments", function(req, res) {
    const comment = new Comment(req.body);
    comment.author = req.user._id;
    comment.post = req.params.postId;

    comment
        .save()
        .then(comment => {
            return User.findById(req.user._id)
        })
        .then(user => {
            user.comments.unshift(comment);
            user.save()
        })
        .then(comment => {
            return Post.findById(req.params.postId);
        })
        .then(post => {
            post.comments.unshift(comment);
            return post.save();
        })
        .then(post => {
            res.redirect(`/`);
        })
        .catch(err => {
            console.log(err);
        });
});


module.exports = commentRouter;
