// const roles = require('../../models/constants/roles');
const Role = require('../../models/role');
const actions = require('../../models/constants/actions');

exports.canDo = function(permissions, action) {
	return permissions.indexOf(action) !== -1;
};

exports.getPermissions = async function(role) {
	return (await Role.findOne({name: role})).actions;
};

exports.getTemplatePayload = function(permissions, title) {
	return Object.assign({
		permissions,
		canDo: exports.canDo,
		actions,
	}, title);
};

exports.wrapAsync = function(fn) {
	return function(req, res, next) {
		fn(req, res, next).catch(next);
	};
};
