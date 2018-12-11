const express = require('express');
const postRouter = express.Router();

// models
const Post = require('../models/posts')
const User = require('../models/user')

// routes

// UPVOTES/ DOWNVOTES

postRouter.put("/posts/:id/vote-up", function(req, res) {
  Post.findById(req.params.id).exec(function(err, post) {
    post.upVotes.push(req.user._id);
    post.voteScore = post.voteTotal + 1;
    post.save();

    res.status(200);
  });
});

postRouter.put("/posts/:id/vote-down", function(req, res) {
  Post.findById(req.params.id).exec(function(err, post) {
    post.downVotes.push(req.user._id);
    post.voteScore = post.voteTotal - 1;
    post.save();

    res.status(200);
  });
});

// GET root
postRouter.get('/', (req, res) => {
    var currentUser = req.user;

    Post.find()
        .populate('author')
        .then(posts => {
            console.log(req.cookies);
            res.render('index', {
                posts,
                currentUser,
        })
    }).catch(e => {
        console.log(e);
    })
})

// GET new
postRouter.get('/posts/new', (req, res) => {
    var currentUser = req.user;

    res.render('posts-new', {
        currentUser,
    });
})

// Get one
postRouter.get('/posts/:id', (req, res) => {
    var currentUser = req.user;

    Post.findById(req.params.id)
        .populate('author')
        .populate({path: 'comments', populate: { path: 'author' }})
        .then(post => {
            res.render('posts-show', {
                post,
                currentUser,
            })
        }).catch(e => {
            console.log(e);
        })
})

// POST new
postRouter.post('/posts', (req, res) => {
    if(req.user) {
        const post = new Post(req.body);
        post.author = req.user;

        post.save()
        .then(user => {
            return User.findById(req.user._id);
        })
        .then(user => {
            user.posts.unshift(post);
            user.save();
            res.redirect('/posts/' + post._id);
        })
        .catch(err => {
            console.log(err.message);
        })
    } else {
        res.status(401);
    };
})

// DELETE one
postRouter.delete("/posts/:id", (req, res) => {
    Post.findByIdAndRemove(req.params.id).then(post => {
        res.redirect('/');
    }).catch(e => {
        console.log(e);
    })
})

// SUBREDDIT
postRouter.get('/n/:subreddit', function(req, res) {
    var currentUser = req.user;

    Post.find({ subreddit: req.params.subreddit })
        .then(posts => {
            res.render("posts-index", {
                 posts,
                 currentUser,
             });
        }).catch(err => {
            console.log(err);
  });
});

module.exports = postRouter;
