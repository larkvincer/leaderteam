const User = require('../../models/user');

exports.getUser = async function(username) {
	return await User.findOne({username});
};

exports.getUserByNameAndRole = async function(username, role) {
	return await User.findOne({username, role});
};

exports.getUsersByCreatorAndRole = async function(creator, role) {
	return await User.find({createdBy: creator, role});
};

exports.getUsersByRole = async function(role) {
	return await User.find({role});
};
