const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
	firstName: {type: String, trim: true},
	lastName: {type: String, trim: true},
	username: {type: String, unique: true, required: true},
	hashedPassword: {type: String, required: true},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
});

UserSchema.pre('save', function(next) {
	const user = this;
	const SALT_FACTOR = 5;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
