const express = require('express');
const commentRouter = express.Router();

// models
const Post = require('../models/posts')
const Comment = require('../models/comments')

// CREATE Comment
commentRouter.post("/posts/:postId/comments", function(req, res) {
  // INSTANTIATE INSTANCE OF MODEL
  const comment = new Comment(req.body);

  // SAVE INSTANCE OF Comment MODEL TO DB
  comment
    .save()
    .then(comment => {
      return Post.findById(req.params.postId);
    })
    .then(post => {
      post.comments.unshift(comment);
      return post.save();
    })
    .then(post => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = commentRouter;
