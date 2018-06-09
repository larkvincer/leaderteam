const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/', async function(req, res, next) {
	const user = await User.find({username: 'larkvincer'});
	if (!user.length) {
		console.log('Creating new user.');
		newUser = new User({
			username: 'larkvincer',
		});
		User.register(newUser, 'larkvincer', function(err, acc) {
			if (err) {
				res.status(501).send(err);
			}

			// passport.authenticate('local')(req, res, function() {
			// 	res.send('/dashboard');
			// });
			res.redirect('/dashboard');
		});
	} else {
		res.render('login', {title: 'Вхід', message: req.flash('error')});
	}
});

// router.post('/', function(req, res, next) {
// 	console.log(req.body.username);
// 	res.send(req);
// 	// res.json({redirect: '/dashboard'});
// });

router.post('/', passport.authenticate('local', {
	successRedirect: '/dashboard/managers',
	failureRedirect: '/',
	failureFlash: true,
}));

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

router.get('/ping', function(req, res) {
	res.status(200).send('pong!');
});

// passport.use(new LocalStrategy(function(username, password, done) {
// 	User.findOne({username: username}, function(err, user) {
// 		if (err) return done(err);
// 		if (!user) return done(null, false, {message: 'Incorrect username.'});
// 		user.comparePassword(password, function(err, isMatch) {
// 			if (isMatch) {
// 				return done(null, user);
// 			} else {
// 				return done(null, false, {message: 'Incorrect password.'});
// 			}
// 		});
// 	});
// }));
// passport.serializeUser(function(user, done) {
// 	done(null, user.id);
// });
// passport.deserializeUser(function(id, done) {
// 	User.findById(id, function(err, user) {
// 		done(err, user);
// 	});
// });

module.exports = router;
