const {validateUsername, validatePassword,
	validateConfirmPassword, validateName} = require('./user-validator');

exports.handleUsername = validateInput(validateUsername);

exports.handlePassword = validateInput(validatePassword);

exports.handleConfirmPassword = validateInput(confirmPasswordValidatorWrapper);

exports.handleName = validateInput(validateName);

function validateInput(validator) {
	return function(event) {
		const error = validator(event.target.value);
		event.target.setCustomValidity(error || '');
		const errorBox = document.querySelector('.errors');
		removeAllNodes(errorBox);
		if (error) {
			errorBox.appendChild(createError(error));
		}
	};
};

function confirmPasswordValidatorWrapper(password) {
	const confirmPasswordInput = document.querySelector(
		'input[name=password]');
	return validateConfirmPassword(password,
		confirmPasswordInput.value);
};


function removeAllNodes(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
};

function createError(text) {
	const newError = document.createElement('span');
	newError.classList.add('form__error');
	newError.innerHTML = text;
	return newError;
};

