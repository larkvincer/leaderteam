const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth');
const actions = require('../models/constants/actions');
const {canDo, getPermissions,
	getTemplatePayload, wrapAsync} = require('./logic/common');
const {getManagersByCreator, getManager} = require('./logic/managers');

if (process.env.DEBUG) {
	router.use(function(req, res, next) {
		if (!req.user) {
			req.user = {
				username: 'larkvincer',
				role: 'manager',
			};
		};
		next();
	});
}

router.use(isAuthenticated);

router.get('/managers',
	wrapAsync(async function(req, res, next) {
		const permissions = await getPermissions(req.user.role);
		if (canDo(permissions, actions.LIST_MANAGERS)) {
			const payload = getTemplatePayload(permissions);
			payload.managers = await getManagersByCreator(req.user.username);
			return res.render('managers', payload);
		}
		res.status(501).send();
	}));

router.get('/managers/:username',
	wrapAsync(async function(req, res, next) {
		const permissions = await getPermissions(req.user.role);
		if (canDo(permissions, actions.LIST_MANAGERS)) {
			const user = await getManager(req.params.username);
			// TODO Proper handle error
			if (!user) {
				throw new Error('No such manager.');
			}
			const payload = getTemplatePayload(permissions);
			payload.user = user;
			return res.render('manager', payload);
		}
		res.status(501).send();
	}));

module.exports = router;
