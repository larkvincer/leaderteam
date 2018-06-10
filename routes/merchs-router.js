const express = require('express');
const router = express.Router();
const {getPermissions, canDo,
	getTemplatePayload, wrapAsync} = require('./logic/common');
const {getUserByRole} = require('./logic/user');
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
		const payload = getTemplatePayload(permissions);
		const users = await getUserByRole(roles.MERCHANDISER);
		payload.managers = users;
		res.render('managers', payload);
	}
	throw Error('Forbidden');
}));

module.exports = router;
