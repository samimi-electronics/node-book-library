// We import needed files
const express = require('express');
const Author = require('../models/author')

// Setting up the express router for this file
const router = express.Router();

// All authors rout
router.get('/', async (req, res) => {
	let searchOptions = {};
	if (req.query.name != null && req.query.name !== '') {
		searchOptions.name = new RegExp(req.query.name, 'i');
	}
	try {
		const authors = await Author.find(searchOptions);
		res.render('authors/index', { 
			authors: authors,
			searchOptions: req.query
		});
	} catch(err) {
		console.log('Error finding authors: ', err);
		res.render('/');
	}
});

// New authors route
router.get('/new', (req, res) => {
	res.render('authors/new', {
		author: new Author()
	});
});

// Creating the author

// The clunky way...
// router.post('/', (req,res) => {
// 	const author = new Author({
// 		name: req.body.name
// 	});
	
// 	author.save((err, newAuthor) => {
// 		if(err) {
// 			res.render('authors/new', {
// 				author: author,
// 				errorMessage: 'Error creating author'
// 			});
// 		} else {
// 			//res.redirect(`authors/${newAuthor}`)
// 			res.redirect(`authors`)
// 		}
// 	});	
// });

// The good way: using async and await
router.post('/', async (req, res) => {
	const author = new Author({
		name: req.body.name
	});
	try {
		const newAuthor = await author.save();
			//res.redirect(`authors/${newAuthor}`)
			res.redirect(`authors`);
	} catch(err) {
		console.log('Error adding autor:' ,err);
		res.render('authors/new', {
			author: author,
			errorMessage: 'Error creating author'
		});
	}
});

module.exports = router;