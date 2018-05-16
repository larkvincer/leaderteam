const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
	res.render('login', {title: 'Вхід'});
});

router.post('/', function(req, res, next) {
	res.json({redirect: '/dashboard'});
});

module.exports = router;