const User = require('../models/user');
const Role = require('../models/role');


exports.canDo = function(allowedActions, action) {
	return allowedActions.indexOf(action) !== -1;
};

exports.checkPermission = async function(role, action) {
	try {
		const allowedActions = await Role.find({name: role}).actions;
		return canDo(allowedActions, action);
	} catch (error) {
		return false;
	}
};
