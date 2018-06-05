const User = require('../models/user');
const Role = require('../models/role');
const actions = require('../models/constants/actions');


exports.canDo = function(allowedActions, action) {
	return allowedActions.indexOf(action) !== -1;
};

exports.getAlloweActions = async function(role) {
	let actions;
	try {
		actions = await Role.find({name: role}).actions;
	} catch (error) {
		console.error(error);
	}
	return actions || [];
};

exports.getPayload = async function(role) {
	let permissions;
	try {
		permissions = await Role.find({name: role}).actions;
	} catch (error) {
		permissions = [];
	}
	return {actions, permissions, canDo: exports.canDo};
};
