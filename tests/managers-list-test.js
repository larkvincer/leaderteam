const assert = require('assert');
const db = require('../models/dbConnection');
const {getManagersByCreator} = require('../routes/logic/managers');
const User = require('../models/user');

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

	after(async function() {
		db.close();
	});
});
