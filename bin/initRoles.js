const db = require('../models/dbConnection.js');
const Role = require('../models/role');
const action = require('../models/constants/actions.js');
const roles = require('../models/constants/roles.js');

console.log('START CREATION OF ROLES.');

(async function() {
	await db.connect();

	const Manager = new Role({
		name: roles.MANAGER,
		actions: [
			action.CREATE_MANAGER,
			action.EDIT_MANAGER,
			action.LIST_MANAGERS,

			action.CREATE_SUPERVISER,
			action.EDIT_SUPERVISER,
			action.LIST_SUPERVISERS,

			action.CREATE_MERCHANDISER,
			action.LIST_MERCHANDISERS,
			action.EDIT_MERCHANDISER,

			action.CREATE_CLIENT,
			action.EDIT_CLIENT,
			action.LIST_CLIENTS,

			action.CREATE_TASK,
			action.LIST_TASKS,
			action.EDIT_TASK,

			action.CREATE_MARKETNET,
			action.LIST_MARKETNETS,
			action.EDIT_MARKETNET,

			action.CREATE_MARKET,
			action.LIST_MARKETS,
			action.LIST_MARKETS,

			action.CREATE_COMMENT,
			action.EDIT_COMMENT,
		],
	});
	const Superviser = new Role({
		name: roles.SUPERVISER,
		actions: [
			action.CREATE_TASK,
			action.LIST_TASKS,
			action.EDIT_TASK,
			action.COMPLETE_TASK,

			action.LIST_SUBORDINATED_MERCH,

			action.LIST_ATTACHED_CLIENTS,

			action.CREATE_COMMENT,
			action.EDIT_COMMENT,
		],
	});
	const Merchandiser = new Role({
		name: roles.MERCHANDISER,
		actions: [
			action.LIST_TASKS,
			action.COMPLETE_TASK,

			action.CREATE_COMMENT,
			action.EDIT_COMMENT,
		],
	});
	const Client = new Role({
		name: roles.CLIENT,
		actions: [
			action.LIST_TASKS,

			action.CREATE_COMMENT,
			action.EDIT_COMMENT,
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
	db.close();
	console.log('ROLES CREATED.');
})();

