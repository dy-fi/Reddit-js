// Declarations
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

// port
const port = process.env.PORT || 3000;

const app = express();

// Express handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Method Override
app.use(methodOverride('_method'));

app.listen(port, console.log('App listening on port ' + port))
