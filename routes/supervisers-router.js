const express = require('express');
const router = express.Router();
const {getPermissions, canDo,
	wrapAsync, getTemplatePayload} = require('./logic/common');
const {getUsersByRole,
	getUserByNameAndRole} = require('./logic/user');
const roles = require('../models/constants/roles');
const titles = require('../models/constants/title');
const actions = require('../models/constants/actions');

if (process.env.DEBUG) {
	router.use(function(req, res, next) {
		if (!req.user) {
			req.user = {
				username: 'larkvincer',
				role: 'manager',
			};
		}
		next();
	});
}


router.get('/supervisers',
	wrapAsync(async function(req, res, next) {
		const permissions = await getPermissions(req.user.role);
		if (canDo(permissions, actions.LIST_SUPERVISERS)) {
			const merchs = await getUsersByRole(roles.SUPERVISER);
			const payload = getTemplatePayload(
				permissions, titles.SUPERVISERS);
			payload.users = merchs;
			res.render('users', payload);
		}
		throw new Error('nea');
	}));

router.get('/supervisers/:username',
	wrapAsync(async function(req, res, next) {
		const permissions = await getPermissions(req.user.role);
		if (canDo(permissions, actions.LIST_SUPERVISERS)) {
			const superv = await getUserByNameAndRole(
				req.params.username, roles.SUPERVISER);
			const payload = getTemplatePayload(
				permissions, titles.SUPERVISERS);
			payload.user = superv;
			res.render('user', payload);
		}
		throw new Error('Forbidden');
	}));

module.exports = router;
