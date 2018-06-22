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

exports.getNameValidators = function() {
	return [
		sanitizeBody('firstName').trim().escape(),
		sanitizeBody('lastName').trim().escape(),
		body('firstName').custom(nameContainOnlyAlphabet),
		body('lastName').custom(nameContainOnlyAlphabet),
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
			if (redirectUrl) {
				return res.redirect(redirectUrl);
			}
			return res.json(errors.array());
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
	if (user.length) {
		throw new Error('Username already in use.');
	}
};

async function checkIfPasswordsMatche(password, {req}) {
	if (password !== req.body.confirmPassword) {
		throw new Error('Passwords should matches.');
	};
};

async function nameContainOnlyAlphabet(name, {req, res}) {
	const validName = /[A-z\u0403-\u04FF\'\-]+$/;
	if (!validName.test(name)) {
		throw new Error('Name should only contain alphbets.');
	}
}
