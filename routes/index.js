const managersRouter = require('./managers-router');
const loginRouter = require('./login-router');
const merchsRouter = require('./merchs-router');


function exp(app) {
	app.use('/', loginRouter);
	app.use('/dashboard', managersRouter);
	app.use('/dashboard', merchsRouter);
}

module.exports = exp;
