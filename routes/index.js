const managersRouter = require('./managers-router');
const loginRouter = require('./login-router');
const merchsRouter = require('./merchs-router');
const supersRouter = require('./supervisers-router');
const reportsRouter = require('./reports-router');

/**
 * @param {Express} app
 */
function exp(app) {
	app.use('/', loginRouter);
	app.use('/dashboard', managersRouter);
	app.use('/dashboard', merchsRouter);
	app.use('/dashboard', supersRouter);
	app.use('/dashboard', reportsRouter);
}

module.exports = exp;
