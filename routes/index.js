// We import express framework again
const express = require('express');

// Setting up the express router for this file
const router = express.Router();

// Setting up the websites root route
router.get('/', (req, res) => {
	res.render('index');
});

module.exports = router;