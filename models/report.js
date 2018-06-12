const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
	description: {
		type: String,
		required: true,
	},
	image: String,
	creator: {
		type: String,
		required: true,
	},
	expirationDate: String,
	numberOfGoodsInMarket: Number,
	numberOfGoodsInStore: Number,
	price: Schema.Types.Decimal128,
	salePrice: Schema.Types.Decimal128,
	relatedTask: String,
});

const Report = mongoose.model('Report', ReportSchema);
module.exports = Report;
