const mongoose = require('mongoose');


// Creating a schema for author (equivelant to tables in MySQL)

const authorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	}
});

// Essentially the name of our tabel in MySQL db's
module.exports = mongoose.model('Author', authorSchema);