const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Role = require('../models/role');
const action = require('../models/constants/actions');

// router.use(function(req, res, next) {
// 	if (req.user) {
// 		return next();
// 	}

// 	res.redirect('/');
// });

router.get('/', async function(req, res, next) {
	// console.log(req.user);
	let managers = [];
	console.log(req.user);
	console.log(req.user.hasOwnProperty('role'));
	console.log(req.user['role']);
	console.log(req.user.username);
	console.log(req.user.createdAt);
	console.log(req.user._id);
	return res.send(await Role.find({name: req.user.role}));
	try {
		const allowedActions = await Role.find({name: req.user.role});
		console.log(allowedActions);
		if (allowedActions.indexOf(action.LIST_MANAGERS) !== -1) {
			managers = await User.find({createdBy: req.user.username});
			console.log(managers);
		}
	} catch (error) {
	}
	res.render('dashboard', {managers});
});

router.get('/managers', async function(req, res, next) {
	// DELETE THIS SHIT
	if (!req.user) req.user = {username: 'larkvincer'};
	const result = await User.find(
		{roles: 'manager', createdBy: req.user.username}
	);
	res.status(200);
	res.json(result);
});

module.exports = router;
