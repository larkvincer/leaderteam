const express = require('express');
const router = express.Router();
const {getPermissions, canDo,
	wrapAsync, getTemplatePayload} = require('./logic/common');
const {getReports} = require('./logic/reports');
const actions = require('../models/constants/actions');
const roles = require('../models/constants/roles');
const fs = require('fs');

/**
 * @todo Change ACTION TYPE to check.
 */
router.get('/reports',
	wrapAsync(async function(req, res, next) {
		const permissions = await getPermissions(req.user.role);
		if (canDo(permissions, actions.LIST_TASKS)) {
			const reports = await getReports();
			const payload = await getTemplatePayload(
				permissions, req.user.role);
			payload.reports = reports;
			res.render('reports', payload);
		}
		throw new Error('Forbidden');
	}));

router.get('/reports/form/add',
	wrapAsync(async function(req, res, next) {
		const permissions = await getPermissions(req.user.role);
		if (canDo(permissions, actions.CREATE_TASK)) {
			const payload = await getTemplatePayload(permissions);
			res.render('add-report', payload);
		}
		throw new Error('Forbidden');
	}));

/**
 * @todo Change ACTION TYPE to check.
 */
router.post('/reports',
	wrapAsync(async function(req, res, next) {
		const permissions = await getPermissions(req.user.role);
		if (canDo(permissions, actions.CREATE_TASK)) {
			res.send(req.body.file);
			await fs.writeFile('bal.jpg', req.body.file);
		}
		throw new Error('Forbidden');
	}));

module.exports = router;
