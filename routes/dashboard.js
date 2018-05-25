const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
	// if (req.session.counter) {
	// 	req.session.counter++;
	// 	res.send('Counter has been already created. Counter ' + req.session.counter);
	// } else {
	// 	req.session.counter = 1;
	// }
	console.log(req.user);
	res.render('dashboard', req.user);
});

module.exports = router;
