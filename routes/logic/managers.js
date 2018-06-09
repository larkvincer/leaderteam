const actions = require('../../models/constants/actions');
const roles = require('../../models/constants/roles');
const User = require('../../models/user');

exports.getManagersByCreator = async function(username) {
	return await User.find({
		createdBy: username,
		role: roles.MANAGER,
	});
};

exports.getManager = async function(username) {
	return await User.findOne({username, role: roles.MANAGER});
};

