const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find().then(function(result) {
		res.json(result);
	}).catch(function(error) {
		res.status(500).send('Error occerred!!');
	});
});

module.exports = router;
