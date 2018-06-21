exports.enableValidation = function(event) {
	console.log('huj');
	const firstName = document.querySelector('input[name=firstName]');
	const lastName = document.querySelector('input[name=lastName]');
	firstName.removeAttribute('disabled');
	lastName.removeAttribute('disabled');
	event.preventDefault();
};
