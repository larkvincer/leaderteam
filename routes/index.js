const managersRouter = require('./managers-router');
const loginRouter = require('./login-router');


function exp(app) {
	app.use('/', loginRouter);
	app.use('/dashboard', managersRouter);
}

module.exports = exp;
