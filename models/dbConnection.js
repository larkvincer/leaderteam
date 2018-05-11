const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/leaderteam';

mongoose.Promise = global.Promise;

(async function() {
	try {
		await mongoose.connect(mongoDB);
	} catch(error) {
		console.log('Cannot connect to DATABASE!!!');
	}
})()

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

module.exports = db;
