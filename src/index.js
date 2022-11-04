const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

const SortMiddleware = require('./app/middlewares/sortMiddleware')

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./src/public'));

//url
app.use(express.urlencoded({
  extended: true
})); // search body parser npm > qs npm

// submit html
app.use(express.json());

app.use(methodOverride('_method'));

// Custom middlewares
app.use(SortMiddleware);

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers: require('./helpers/handlebars')
}));
app.set('view engine', 'hbs');

// search express-handlebars nodejs set view folder
app.set('views', './src/resources/views');
// console.log('PATH', path.join(__dirname) + '\\resources\\views');

route(app);

app.listen(port, () =>
  console.log(`Example app listening on port ${port}`)
);
