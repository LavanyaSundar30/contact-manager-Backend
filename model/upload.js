const mongoose = require('mongoose');


const uploadSchema = new mongoose.Schema({

	fileLocation : {
		type: String
	}
});

module.exports = mongoose.model('upload', uploadSchema);
