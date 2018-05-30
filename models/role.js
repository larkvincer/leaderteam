const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
	name: {
		type: String,
		unique: true,
		require: true,
		trim: true,
	},
	actions: {
		type: [String],
	},
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;
