const express = require('express');
const router = express.Router();
const {canDo, getAlloweActions, getPayload} = require('../middlewares/helper');
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
	const payload = getPayload();
	payload.managers = [];
	try {
		if (canDo(payload.permissions, actions.LIST_MANAGERS)) {
			payload.managers = await User.find({
				createdBy: req.user.username,
				role: roles.MANAGER,
			});
		}
		res.render('managers', payload);
	} catch (error) {
		throw error;
		res.status(500).send(error);
	}
});

router.get('/managers/:username', async function(req, res, next) {
	// check permissions
	console.log(req.user.role);
	const allowedActions = await getAlloweActions(req.user.role);
	console.log(allowedActions);
	console.log(await Role.find({name: req.user.name}));
	if (canDo(allowedActions, actions.LIST_MANAGERS)) {
		let user;
		try {
			user = await User.findOne({username: req.params.username});
		} catch (error) {
			res.status(500).send();
		}
		if (user) {
			const payload = await getPayload();
			payload.user = user;
			console.log(payload);
			res.render('manager', payload).send();
		}
	}

	console.log('Im here');
	res.status(403).send('Nea');
});

module.exports = router;
