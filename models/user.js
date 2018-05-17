const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstName: {type: String, trim: true},
	lastName: {type: String, trim: true},
	username: {type: String, unique: true, required: true},
	hashedPassword: {type: String, required: true},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
