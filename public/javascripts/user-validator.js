exports.validateUsername = function(username) {
	const legalChars = /[\w\u0403-\u04FF]/g;

	if (username == '') {
		return 'Please enter username';
	}
	if ((username.length < 3) || (username.length > 15)) {
		return 'Username must have 3-15 characters';
	}
	if (!legalChars.test(username)) {
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
	const firstUpper = /^[A-Z\u0403-\u042F]/;
	if (!firstUpper.test(name)) {
		return 'Name shoud start from capital.';
	}
	if (!name) {
		return;
	}
	const legalCharacters = /[A-z\u0403-\u04FF\'\-]+$/;
	if (!legalCharacters.test(name)) {
		return 'Name could only contain alphabet and \' \-';
	}
};

