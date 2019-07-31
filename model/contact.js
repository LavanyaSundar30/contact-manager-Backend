const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
        unique: true,
        lowercase: true,
        required: true
	},
	phone: {
		type: Number,
        size: 10
	},
	city: {
		type: String,
		required: true
	},
	fileLocation : {
		type: String
	},
	favorite: {
		type: Boolean,
		default: false
	}


});

module.exports = new mongoose.model("contact", contactSchema);
