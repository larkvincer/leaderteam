const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Role = require('../models/role');
const action = require('../models/constants/actions');

const DEBUG = true;
if (DEBUG) {
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
router.use(function(req, res, next) {
	if (req.user) {
		return next();
	}

	res.redirect('/');
});


router.get('/managers', async function(req, res, next) {
	let payload = {};
	payload.action = action;
	try {
		const allowedActions = (await Role.findOne({name: req.user.role})).actions;
		payload.permissions = allowedActions;
		payload.canDo = canDo;
		if (canDo(allowedActions, action.LIST_MANAGERS)) {
			payload.managers = await User.find({createdBy: req.user.username});
		}
	} catch (error) {
		res.status(500).send('Error');
	}
	res.render('dashboard', payload);
});

router.get('/merchandisers', async function(req, res, next) {
	try {
		const allowedActions = (await Role.findOne({name: req.user.role})).actions;
		payload.permissions = allowedActions;
		payload.canDo = canDo;
		if (canDo(allowedActions, action. LIST_MERCHANDISERS)) {
			payload.merchandisers = await User.find();
		}
	} catch (error) {
		res.status(500).redirect('/404');
	}
});

function canDo(allowedActions, action) {
	return allowedActions.indexOf(action) !== -1;
};

module.exports = router;
