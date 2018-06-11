const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: String,
	creator: String,
	asignee: String,
	deadline: Date,
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
