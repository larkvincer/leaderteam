const Report = require('../../models/report');
const multer = require('multer');

/**
 * @return {Array} all available reports asynchronously
 */
exports.getReports = function() {
	return Report.find();
};

/**
 * @param {object} storage config
 * @param {Function} fileFilter config
 * @return {object} multer configuration
 */
exports.getMulterConfig = function(
	storage=exports.getMulterStorageConfig(),
	fileFilter=exports.getMulterFileFilter()) {
	return {storage, fileFilter};
};

/**
 * @return {Function} config for multer diskstorage
 */
exports.getMulterStorageConfig = function() {
	return multer.diskStorage({
		destination: function(req, file, next) {
			next(null, './uploads');
		},
		filename: function(req, file, next) {
			const ext = file.mimetype.split('/')[1];
			next(null, `${file.fieldname}-${Date.now()}.${ext}`);
		},
	});
};

/**
 * @return {Function} filter
 */
exports.getMulterFileFilter = function() {
	return function(req, file, next) {
		if (!file) next;
		const image = file.mimetype.startsWith('image/');
		if (image) {
			console.log('Image uploaded');
			next(null, true);
		} else {
			next();
		}
	};
};

