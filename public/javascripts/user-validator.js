exports.validateUsername = function(username) {
	const error = '';
	const illegalChars = /\W/; // allow letters, numbers, and underscores

	if (str == '') {
		error = 'Please enter Username';
	} else if ((str.length < 5) || (str.length > 15)) {
		error = 'Username must have 5-15 characters<br>';
	} else if (illegalChars.test(str)) {
		error = 'Please enter valid Username. Use only numbers and alphabets';
	}
	return error;
};

exports.validatePassword = function() {

};

exports.validateName = function() {

};

