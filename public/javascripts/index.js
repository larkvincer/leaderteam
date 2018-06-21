const {handleUsername, handlePassword,
	handleConfirmPassword, handleName} = require('./user-form');
const {enableValidation} = require('./user-edit');

document.addEventListener('DOMContentLoaded', function() {
	// User form
	const usernameInput = document.querySelector('input[name=username]');
	subscribeIfCan(usernameInput, 'input', handleUsername);

	const password = document.querySelector('input[name=password]');
	subscribeIfCan(password, 'input', handlePassword);

	const cPassword = document.querySelector('input[name=confirmPassword]');
	subscribeIfCan(cPassword, 'input', handleConfirmPassword);

	const firstName = document.querySelector('input[name=firstName]');
	subscribeIfCan(firstName, 'input', handleName);

	const lastName = document.querySelector('input[name=lastName]');
	subscribeIfCan(lastName, 'input', handleName);


	// User edit
	const editButton = document.querySelector('.edit-button');
	subscribeIfCan(editButton, 'click', enableValidation);
});

function subscribeIfCan(node, event, callback) {
	if (node) {
		node.addEventListener(event, callback);
	}
};
