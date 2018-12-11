// enviroment variables
require('dotenv').config();

// Declarations
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const methodOverride = require('method-override');

// port
const port = process.env.PORT || 3000;

// app
const app = express();

// Express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// mongoose connect
require('./data/reddit-db')

// static scripts and styles in public
app.use(express.static('public'));

// MIDDLEWARE method override
app.use(methodOverride('_method'));

// MIDDLEWARE body parser
app.use(bodyParser.urlencoded({ extended: true }));

// MIDDLEWARE cookie parser
app.use(cookieParser());

// MIDDLEWARE authentication
var checkAuth = (req, res, next) => {
    console.log("Checking authentication...");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
        console.log("Auth Failed")
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }

    next();
};

app.use(checkAuth);

// routes
const handlePostRoutes = require('./controllers/post');
const handleCommentRoutes = require('./controllers/comment')
const handleAuthRoutes = require('./controllers/auth')
const handleUserRoutes = require('./controllers/user')

app.use(handlePostRoutes)
app.use(handleCommentRoutes)
app.use(handleAuthRoutes)
app.use(handleUserRoutes)

app.listen(port, console.log('App listening on port ' + port))
