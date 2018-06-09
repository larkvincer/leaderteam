const assert = require('assert');
const db = require('../models/dbConnection');
const {getPermissions} = require('../routes/logic/common');

describe('Common module test.', function() {
	before(function() {
		db.connect();
	});

	describe('getPermissions test.', function() {
		it('should return array.', async function() {
			const result = await getPermissions('manager');
			assert.equal(Array.isArray(result), true);
		});
	});

	after(function() {
		db.close();
	});
});
