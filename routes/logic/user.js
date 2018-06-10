const User = require('../../models/user');

exports.getUser = async function(username) {
	return await User.findOne({username});
};

exports.getUserByRole = async function(role) {
	return await User.find({role});
};
