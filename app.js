require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const db = require('./models/dbConnection');

// Authentication imports
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

// Routes
const routing = require('./routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set up middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
	secret: 'pavlo',
	resave: false,
	saveUninitialized: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// DB connection
db.connect();

// servce static files
app.use(express.static(path.join(__dirname, 'public/dist/')));

// Passport config
const User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Plug in routers
routing(app);

app.use(function(req, res, next) {
	if (!req.user) {
		req.user = {
			username: 'larkvincer',
			role: 'superviser',
		};
	}
	next();
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
