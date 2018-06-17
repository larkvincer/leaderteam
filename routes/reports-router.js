const express = require('express');
const router = express.Router();
const {getPermissions, canDo,
	wrapAsync, getTemplatePayload} = require('./logic/common');
const {getReports, getMulterConfig} = require('./logic/reports');
const actions = require('../models/constants/actions');
const titles = require('../models/constants/title');
const multer = require('multer');
const upload = multer(getMulterConfig());
const Report = require('../models/report');


/**
 * @todo Change ACTION TYPE to check.
 */
router.get('/reports',
	wrapAsync(async function(req, res, next) {
		const permissions = await getPermissions(req.user.role);
		if (canDo(permissions, actions.LIST_TASKS)) {
			const reports = await getReports();
			const payload = await getTemplatePayload(
				permissions, titles.REPORTS);
			payload.reports = reports;
			return res.render('reports', payload);
		}
		throw new Error('Forbidden');
	}));

router.get('/reports/form/add',
	wrapAsync(async function(req, res, next) {
		const permissions = await getPermissions(req.user.role);
		if (canDo(permissions, actions.CREATE_TASK)) {
			const payload = await getTemplatePayload(
				permissions, titles.REPORTS);
			return res.render('add-report', payload);
		}
		throw new Error('Forbidden');
	}));

/**
 * @todo Change ACTION TYPE to check.
 * @todo properly handle prices.
 */
router.post('/reports',
	upload.single('image'),
	wrapAsync(async function(req, res, next) {
		const permissions = await getPermissions(req.user.role);
		if (canDo(permissions, actions.CREATE_TASK)) {
			const report = new Report(Object.assign({
				image: req.file.filename,
				creator: req.user.username,
			}, req.body));
			await report.save();
			return res.send(req.body);
		}
		throw new Error('Forbidden');
	}));

module.exports = router;
