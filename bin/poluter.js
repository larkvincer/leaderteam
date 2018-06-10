const faker = require('faker');
const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const role = require('../models/constants/roles.js');

const db = require('../models/dbConnection.js');
(async function() {
	await db.connect();
})();
// Passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const users = generateUsers(15, role.MERCHANDISER, 'larkvincer').concat(
	generateUsers(15, role.SUPERVISER, 'larkvincer')
);


const promises = users.reduce(function(acc, cv, ci, arr) {
	return acc.push(User.register(cv, cv.password)), acc;
}, []);

Promise.all(promises).then(function() {
	console.log('SUCCESSFULLY POLUTE DATABASE.');
	db.close();
}).catch(function(error) {
	console.log('ERROR WAS OCCURRED');
	console.error(error);
	db.close();
});

function generateUsers(
	number = 15, role = 'manager',
	createdBy = 'larkvincer'
) {
	const result = [];
	for (let i = 0; i < 15; i++) {
		result.push(getRandomUser(role, createdBy));
	}
	return result;
}


function getRandomUser(role, createdBy) {
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();
	const username = faker.internet.userName();
	const password = faker.internet.password();
	return {firstName, lastName, username, password, role, createdBy};
}
