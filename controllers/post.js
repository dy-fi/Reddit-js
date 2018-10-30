const express = require('express');
const postRouter = express.Router();

// models

// routes
postRouter.get('/', (req, res) => {
    res.render('index', {});
})


module.exports = postRouter;
