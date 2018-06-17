const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', async function(req, res, next) {
	if (req.user) {
		return res.redirect('/dashboard/managers');
	}
	res.render('login', {title: 'Вхід', message: req.flash('error')});
});

router.post('/', passport.authenticate('local', {
	successRedirect: '/dashboard/managers',
	failureRedirect: '/',
	failureFlash: true,
}));

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;
