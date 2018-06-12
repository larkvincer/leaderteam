const User = require('../../models/user');

exports.getUser = async function(username) {
	return await User.findOne({username});
};

/**
 * @param {string} username
 * @param {strong} role
 * @return {Array} list of users.
 */
exports.getUserByNameAndRole = async function(username, role) {
	return await User.findOne({username, role});
};

/**
 * @param {string} creator
 * @param {string} role
 * @return {Array} list of users.
 */
exports.getUsersByCreatorAndRole = async function(creator, role) {
	return await User.find({createdBy: creator, role});
};

/**
 * @param {string} role
 * @return {Array}
 */
exports.getUsersByRole = async function(role) {
	return await User.find({role});
};
