const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
	if (req.user) {
		return next();
	}

	res.redirect('/');
});

router.get('/', function(req, res, next) {
	console.log(req.user);
	res.render('dashboard', req.user);
});

module.exports = router;
