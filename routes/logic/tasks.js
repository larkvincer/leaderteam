const Task = require('../../models/task');


/**
 * @return {Array}
 */
exports.getTasks = function() {
	return Task.find();
};
