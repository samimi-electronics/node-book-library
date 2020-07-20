/* Note:
	A lot of people setup routes in the index.js (server.js)
	but for bigger applications it's better to have them in
	another file. Since we will use MVC model for this project,
	we will set it up in the controller because that what a 
	controler does. It routes all the user's requests to the
	needed model and views. In the Node.JS world, controllers
	are refered to as routs. They are essentially the same idea.

	We create a folder for each of our models, views and 
	controllers (routes).
 */

// Importing needed files

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// Setting up our development port address
const PORT = 3000;

//-------------------------------------------------------------

/* Appliction setup */

// Setting view engine
app.set('view engine', 'ejs');

// Set where views come from
app.set('views', __dirname + '/views');

// Hookup express app main layout
app.set('layout', 'layouts/layout');

// Tell express app use express layouts
app.use(expressLayouts);

// Importing our routes
const indexRouter = require('./routes/index');

// Setting up routes to be used
app.use('/', indexRouter);

// We need to tell express where all our public files will be
app.use(express.static('./public'));

//-------------------------------------------------------------

/* Setting up the database */
const mongoose = require('mongoose');

// Setup the connection
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
// Create database connection
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to mongoose...'));

app.listen(process.env.PORT || PORT);





