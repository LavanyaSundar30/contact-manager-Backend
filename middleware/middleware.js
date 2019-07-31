const express = require('express');
const server = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./../config/config");
const adminController = require('./../controller/admin');
var cors = require('cors');
server.use("/", (req, res, next) => {
	let { protocal, host, port, name } = config.app.db;
	mongoose.connect(`${protocal}${host}:${port}/${name}`, { useNewUrlParser: true });
	next();
});
server.use(cors({
    origin: 'http://localhost:4200'
}));


server.use(['/contacts'], async (req, res, next) => {
	if(!req.headers.authorization){
		return res.send({
			status: 'error',
			msg: 'Invalid Token'
		})
	}

	await adminController.validateToken(res, req.headers.authorization);

	next();
})


server.use(bodyParser.json());

module.exports = server;
