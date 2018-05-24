const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.get('/', function(req, res, next) {
	res.render('login', {title: 'Вхід'});
});

// router.post('/', function(req, res, next) {
// 	console.log(req.body.username);
// 	res.send(req);
// 	// res.json({redirect: '/dashboard'});
// });

router.post('/', passport.authenticate('local', {
	successRedirect: '/dashboard',
	failureRedirect: '/',
}));

passport.use(new LocalStrategy(function(username, password, done) {
	User.findOne({username: username}, function(err, user) {
		if (err) return done(err);
		if (!user) return done(null, false, {message: 'Incorrect username.'});
		user.comparePassword(password, function(err, isMatch) {
			if (isMatch) {
				return done(null, user);
			} else {
				return done(null, false, {message: 'Incorrect password.'});
			}
		});
	});
}));
passport.serializeUser(function(user, done) {
	done(null, user.id);
});
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

module.exports = router;
