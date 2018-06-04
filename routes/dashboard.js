const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Role = require('../models/role');
const action = require('../models/constants/actions');
const roles = require('../models/constants/roles');

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
