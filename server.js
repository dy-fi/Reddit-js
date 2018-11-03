// Declarations
const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

// port
const port = process.env.PORT || 3000;

const app = express();

// mongoose connect
require('./data/reddit-db')

// static scripts and styles in public
app.use(express.static('public'));

// MIDDLEWARE body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Method Override
app.use(methodOverride('_method'));

// Express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// routes
const handlePostRoutes = require('./controllers/post');
const handleCommentRoutes = require('./controllers/comment')
const handleAuthRoutes = require('./controllers/auth')

app.use(handlePostRoutes)
app.use(handleCommentRoutes)
app.use(handleAuthRoutes)

app.listen(port, console.log('App listening on port ' + port))
