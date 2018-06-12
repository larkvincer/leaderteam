const Report = require('../../models/report');

/**
 * @return {Array} all available reports asynchronously
 */
exports.getReports = function() {
	return Report.find();
};
