const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth');
const actions = require('../models/constants/actions');
const roles = require('../models/constants/roles');
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
			const payload = getTemplatePayload(
				permissions, roles.MANAGER);
			payload.users = await getManagersByCreator(req.user.username);
			return res.render('users', payload);
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
			const payload = getTemplatePayload(
				permissions, roles.MANAGER);
			payload.user = user;
			return res.render('user', payload);
		}
		res.status(501).send();
	}));

router.get('/managers/add/new',
	wrapAsync(async function(req, res, next) {
		const permissions = await getPermissions(req.user.role);
		if (canDo(permissions, actions.CREATE_MANAGER)) {
			const payload = getTemplatePayload(permissions, roles.MANAGER);
			return res.render('add-user.pug', payload);
		}
		throw Error('forbidden.');
	}));

router.post('/managers/add',
	wrapAsync(function(req, res, next) {
		res.send(req.body);
	}));

module.exports = router;
