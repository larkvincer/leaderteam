const connection = require('../models/dbConnection.js');
const Role = require('../models/role');
const action = require('../models/permissions.js');

console.log('START CREATION OF ROLES.');

(async function() {
	const Manager = new Role({
		name: 'manager',
		actions: [
			action.CREATE_MANAGERS,
			action.EDIT_MANAGERS,
			action.CREATE_SUPERVISER,
			action.EDIT_SUPERVISER,
		],
	});
	const Merchandiser = new Role({
		name: 'merchandiser',
		actions: [],
	});
	const Superviser = new Role({
		name: 'superviser',
		actions: [],
	});
	const Client = new Role({
		name: 'client',
		actions: [],
	});

	try {
		await Manager.save();
		console.log('Manager was created.');

		await Merchandiser.save();
		console.log('Merchandiser was created.');

		await Superviser.save();
		console.log('Superviser was created.');

		await Client.save();
		console.log('Client was created.');
	} catch (error) {
		console.log(error);
		return;
	}
	connection.close();
	console.log('ROLES CREATED.');
})();

