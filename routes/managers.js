const express = require('express');
const router = express.Router();
const {canDo, checkPermission} = require('../middlewares/helper');
const Role = require('../models/role');
const isAuthenticated = require('../middlewares/auth');
const actions = require('../models/constants/actions');
const roles = require('../models/constants/roles');
const User = require('../models/user');

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

router.get('/managers', async function(req, res) {
	let payload = {};
	payload.actions = actions;
	payload.managers = [];
	try {
		const allowedActions = (await Role.findOne({name: req.user.role})).actions;
		payload.permissions = allowedActions || [];
		payload.canDo = canDo;
		if (canDo(allowedActions, actions.LIST_MANAGERS)) {
			payload.managers = await User.find({
				createdBy: req.user.username,
				role: roles.MANAGER,
			});
		}
		res.render('dashboard', payload);
	} catch (error) {
		throw error;
		res.status(500).send(error);
	}
});

router.get('/managers/:username', async function(req, res, next) {
	// check permissions
	if (checkPermission(req.user.role, actions.LIST_MANAGERS)) {
		try {
			const user = await User.findOne({username: req.params.username});
			if (user) {
				res.json(user);
			}
		} catch (error) {
			return res.status(500).send();
		}
	}

	console.log('Im here');
	res.status(404).send('hello');
});

module.exports = router;
