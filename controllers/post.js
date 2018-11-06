const express = require('express');
const postRouter = express.Router();

// models
const Post = require('../models/posts')

// routes

// GET root
postRouter.get('/', (req, res) => {
    var currentUser = req.user;

    Post.find().then(posts => {
        console.log(req.cookies);
        res.render('index', {
            posts: posts,
            currentUser: currentUser,
        })
    }).catch(e => {
        console.log(e);
    })
})

// GET new
postRouter.get('/posts/new', (req, res) => {
    var currentUser = req.user;

    res.render('posts-new', {});
})

// Get one
postRouter.get('/posts/:id', (req, res) => {
    var currentUser = req.user;

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
    var currentUser = req.user;

    Post.create(req.body).then(post => {
        console.log(post);
        res.redirect(`posts/${post._id}`, {
            currentUser: currentUser,
        });
    }).catch(e => {
        console.log(e);
    })
})

// SUBREDDIT
postRouter.post("/n/:subreddit", function(req, res) {
    var currentUser = req.user;

    Post.find({ subreddit: req.params.subreddit })
        .then(posts => {
            res.render("posts-index", {
                 posts: posts,
                 currentUser: currentUser,
             });
        }).catch(err => {
            console.log(err);
  });
});

module.exports = postRouter;
