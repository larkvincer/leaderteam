const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
	firstName: {type: String, trim: true},
	lastName: {type: String, trim: true},
	username: {type: String, unique: true, required: true},
	password: {type: String},
	createdBy: {type: String, required: true},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
	role: {type: String},
});

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', UserSchema);
module.exports = User;
