exports.validateUsername = function(username) {
	const illegalChars = /\W/;

	if (username == '') {
		return 'Please enter username';
	}
	if ((username.length < 3) || (username.length > 15)) {
		return 'Username must have 3-15 characters';
	}
	if (illegalChars.test(username)) {
		return 'Use only numbers and alphabets for username';
	}
};

exports.validatePassword = function(password) {
	if (password.length < 5) {
		return 'Password should contain at least 5 symbols';
	}
};

exports.validateConfirmPassword = function(p1, p2) {
	if (p1 !== p2) {
		return 'Passwords should match';
	}
};

exports.validateName = function(name) {
	const firstUpper = /^[A-Z]/;
	if (!firstUpper.test(name)) {
		return 'Name shoud start from capital.';
	}
	if (!name) {
		return;
	}
	const legalCharacters = /[A-z\'\-]+$/;
	if (!legalCharacters.test(name)) {
		return 'Name could only contain alphabet and \' \-';
	}
};

