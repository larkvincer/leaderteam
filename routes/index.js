const managersRouter = require('./managers-router');


function exp(app) {
	app.use('/dashboard', managersRouter);
}

module.exports = exp;
