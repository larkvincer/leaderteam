const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth');
const actions = require('../models/constants/actions');
const roles = require('../models/constants/roles');
const titles = require('../models/constants/title');
const {canDo, getPermissions,
	getTemplatePayload, wrapAsync} = require('./logic/common');
const {getManagersByCreator, getManager} = require('./logic/managers');
const User = require('../models/user');
const {getUsernameValidators, getPasswordValidators,
	getValidationErrorsHandler, getNameValidators,
} = require('./middleware/user-validator');

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

router.use(isAuthenticated);

router.get('/managers',
	wrapAsync(async function(req, res, next) {
		const permissions = await getPermissions(req.user.role);
		if (canDo(permissions, actions.LIST_MANAGERS)) {
			const payload = getTemplatePayload(
				permissions, titles.MANAGERS);
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
				permissions, titles.MANAGERS);
			payload.user = user;
			return res.render('user', payload);
		}
		res.status(501).send();
	}));

router.get('/managers/form/add',
	wrapAsync(async function(req, res, next) {
		const permissions = await getPermissions(req.user.role);
		if (canDo(permissions, actions.CREATE_MANAGER)) {
			const payload = getTemplatePayload(
				permissions, titles.MANAGERS);
			payload.messages = req.flash('error');
			return res.render('add-user.pug', payload);
		}
		throw Error('forbidden.');
	}));

router.post('/managers', [
	...getUsernameValidators(), ...getPasswordValidators(),
	getValidationErrorsHandler('/dashboard/managers/form/add'),
], wrapAsync(async function(req, res, next) {
	const permissions = await getPermissions(req.user.role);
	if (canDo(permissions, actions.CREATE_MANAGER)) {
		const user = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			createdBy: req.user.username,
			role: roles.MANAGER,
		});
		try {
			await User.register(user, req.body.password);
		} catch (error) {
			req.flash('error', error.message);
			res.redirect('/dashboard/managers/form/add');
		}
		res.redirect(`/dashboard/managers/${user.username}`);
	} else {
		throw new Error('Forbidden.');
	}
}));

router.put('/managers/:username', [
	...getNameValidators(),
	getValidationErrorsHandler(),
], wrapAsync(async function(req, res, next) {
	const permissions = await getPermissions(req.user.role);
	if (canDo(permissions, actions.EDIT_MANAGER)) {
		const result = await User.update({username: req.params.username},
			{
				$set: {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
				},
			});
		res.json(result);
	} else {
		throw new Error('Forbidden.');
	}
}));

module.exports = router;
