const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/leaderteam';

mongoose.Promise = global.Promise;

exports.connect = async function() {
	if (exports.isConnected()) {
		return;
	}
	console.log('This is some dummy text.');
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

