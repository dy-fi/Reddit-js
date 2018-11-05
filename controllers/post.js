const express = require('express');
const postRouter = express.Router();

// models
const Post = require('../models/posts')

// routes

// GET root
postRouter.get('/', (req, res) => {
    Post.find().then(posts => {
        console.log(req.cookies);
        res.render('index', {
            posts: posts,
        })
    }).catch(e => {
        console.log(e);
    })
})

// GET new
postRouter.get('/posts/new', (req, res) => {
    res.render('posts-new', {});
})

// Get one
postRouter.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id).populate('comments').then(posts => {
        res.render('posts-show', {
            posts: posts,
        })
    }).catch(e => {
        console.log(e);
    })
})

// POST new
postRouter.post('/posts', (req, res) => {
    Post.create(req.body).then(post => {
        console.log(post);
        res.redirect(`posts/${post._id}`);
    }).catch(e => {
        console.log(e);
    })
})

// SUBREDDIT
postRouter.post("/n/:subreddit", function(req, res) {
    Post.find({ subreddit: req.params.subreddit })
        .then(posts => {
            res.render("posts-index", {
                 posts: posts
             });
        }).catch(err => {
            console.log(err);
  });
});

module.exports = postRouter;
