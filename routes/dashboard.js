const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
	// if (req.session.counter) {
	// 	req.session.counter++;
	// 	res.send('Counter has been already created. Counter ' + req.session.counter);
	// } else {
	// 	req.session.counter = 1;
	// }
	res.render('dashboard');
});

module.exports = router;
