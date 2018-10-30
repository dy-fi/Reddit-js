// Declarations
const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

// port
const port = process.env.PORT || 3000;

const app = express();

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true}));

// Method Override
app.use(methodOverride('_method'));

// Express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// routes
const handlePostRoutes = require('./controllers/post');
app.use(handlePostRoutes)

app.listen(port, console.log('App listening on port ' + port))
