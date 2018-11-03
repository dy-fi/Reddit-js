const express = require('express')
const authRouter = express.Router()

authRouter.get('/sign-up', (req, res) => {
    res.render('user-new', {});
})

authRouter.get('/login', (req, res) => {
    res.render('user-login', {});
})


// SIGN UP POST
authRouter.post("/sign-up", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(user => {
      res.redirect("/");
    }).catch(err => {
      console.log(err.message);
    });
});

module.exports = authRouter;
