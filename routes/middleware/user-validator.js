const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');
const {getTemplatePayload} = require('../logic/common');
const titles = require('../../models/constants/title');
const User = require('../../models/user');

exports.getUsernameValidators = function() {
	return [
		sanitizeBody('username').trim().escape(),
		body('username', 'Username is too small.').isLength({min: 3}),
		body('username').custom(checkUsernameUniqueness),
	];
};

exports.getPasswordValidators = function() {
	return [
		sanitizeBody('password').trim().escape(),
		body('password', 'Password shoud contain at least' +
			'5 characters.').isLength({min: 5}),
		body('password').custom(checkIfPasswordsMatche),
	];
};

exports.getValidationErrorsHandler = function(redirectUrl) {
	return function(req, res, next) {
		const errors = validationResult(req)
			.formatWith(getErrorFormatter());
		if (!errors.isEmpty()) {
			req.flash('error', errors.array());
			return res.redirect(redirectUrl);
		}
		next();
	};
};

function getErrorFormatter() {
	return function({msg}) {
		return msg;
	};
};

async function checkUsernameUniqueness(username) {
	const user = await User.find({username}, 'username');
	console.log(user);
	if (user.length) {
		throw new Error('Username already in use.');
	}
};

function checkIfPasswordsMatche(password, {req}) {
	if (password !== req.body.confirmPassword) {
		throw new Error('Passwords should matches.');
	};
	return Promise.resolve();
};
