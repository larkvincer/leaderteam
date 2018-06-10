const express = require('express');
const router = express.Router();
const {getPermissions, canDo,
	getTemplatePayload, wrapAsync} = require('./logic/common');
const {getUsersByRole, getUserByNameAndRole} = require('./logic/user');
const actions = require('../models/constants/actions');
const roles = require('../models/constants/roles');

if (process.env.DEBUG) {
	router.use(function(req, res, next) {
		if (req.user) {
			return next();
		}

		req.user = {
			username: 'larkvincer',
			role: 'manager',
		};
		next();
	});
}

router.get('/merchandisers', wrapAsync(async function(req, res, next) {
	const permissions = await getPermissions(req.user.role);
	if (canDo(permissions, actions.LIST_MERCHANDISERS)) {
		const payload = getTemplatePayload(
			permissions, roles.MERCHANDISER);
		const users = await getUsersByRole(roles.MERCHANDISER);
		payload.users = users;
		res.render('users', payload);
	}
	throw Error('Forbidden');
}));

router.get('/merchandisers/:username',
	wrapAsync(async function(req, res, next) {
		const permissions = await getPermissions(req.user.role);
		if (canDo(permissions, actions.LIST_MERCHANDISERS)) {
			const payload = getTemplatePayload(
				permissions, roles.MERCHANDISER);
			const user = await getUserByNameAndRole(
				req.params.username, roles.MERCHANDISER);
			if (!user) {
				throw new Error('No such merchandiser.');
			}
			payload.user = user;
			res.render('user', payload);
		}
		throw Error('Forbidden!');
	}));

module.exports = router;
