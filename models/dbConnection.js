const mongoose = require('mongoose');
const env = require('dotenv');
env.config();

const mongoDB = `${process.env.DB_HOST}/${process.env.DB}`;

mongoose.Promise = global.Promise;

exports.connect = async function() {
	if (exports.isConnected()) {
		return;
	}
	try {
		await mongoose.connect(mongoDB);
	} catch (error) {
		console.log('Cannot connect to DATABASE!!!');
	}
};

exports.close = async function() {
	await mongoose.connection.close();
};

exports.isConnected = function() {
	return mongoose.connection.readyState;
};

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

