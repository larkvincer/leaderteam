const assert = require('assert');
const db = require('../models/dbConnection');
const {getManagersByCreator, getManager} = require('../routes/logic/managers');
const User = require('../models/user');
const roles = require('../models/constants/roles');

describe('Managers list tests.', function() {
	before(async function() {
		await db.connect();
	});

	describe('getManagersByCreator test.', function() {
		const username = 'user' + Date.now();
		const creator = 'superuser' + Date.now();
		before(async function() {
			const user = new User({username: username,
				createdBy: creator,
				role: 'manager',
			});
			await user.save();
		});

		it('should return non null or undefined value', async function() {
			const result = await getManagersByCreator(creator);
			assert.notEqual(result, null);
			assert.notEqual(result, undefined);
		});

		it('should contain one user in resulted array.', async function() {
			const result = await getManagersByCreator(creator);
			assert.equal(result.length, 1);
		});

		after(async function() {
			await User.deleteOne({$and: [{username},
				{createdBy: creator}]});
		});
	});

	describe.only('getManager tests.', async function() {
		const username = 'user' + Date.now();
		const creator = 'superuser' + Date.now();
		before(async function() {
			const user = new User({username,
				createdBy: creator,
				role: roles.MANAGER,
			});
			await user.save();
		});

		it('should return an proper object', async function() {
			const result = await getManager(username);
			assert.equal(result.username, username);
		});

		it('should return null if no such manager', async function() {
			const result = await getManager('dfdf');
			assert.equal(result, null);
		});

		after(async function() {
			await User.deleteOne({$and: [
				{username: username},
				{role: roles.MANAGER},
			]});
		});
	});

	after(async function() {
		db.close();
	});
});
