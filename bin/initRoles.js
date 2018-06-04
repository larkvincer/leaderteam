const connection = require('../models/dbConnection.js');
const Role = require('../models/role');
const action = require('../models/constants/actions.js');
const roles = require('../models/constants/roles.js');

console.log('START CREATION OF ROLES.');

(async function() {
	const Manager = new Role({
		name: roles.MANAGER,
		actions: [
			action.CREATE_MANAGER,
			action.EDIT_MANAGER,
			action.LIST_MANAGERS,
			action.CREATE_SUPERVISER,
			action.EDIT_SUPERVISER,
			action.LIST_SUPERVISERS,
			action.CREATE_CLIENT,
			action.EDIT_CLIENT,
			action.LIST_CLIENTS,
			action.CREATE_TASK,
			action.LIST_TASKS,
			action.LIST_MARKETS,
		],
	});
	const Superviser = new Role({
		name: roles.SUPERVISER,
		actions: [
			action.CREATE_TASK,
		],
	});
	const Merchandiser = new Role({
		name: roles.MERCHANDISER,
		actions: [
			action.LIST_TASKS,
			action.COMPLETE_TASK,
		],
	});
	const Client = new Role({
		name: roles.CLIENT,
		actions: [
			action.LIST_TASKS,
		],
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

