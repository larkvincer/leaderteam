const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
	description: {
		type: String,
		required: true,
	},
	image: String,
	creator: String,
	expirationDate: String,
	numberOfGoodsInMarket: Number,
	numberOfGoodsOnStore: Number,
	price: Schema.Types.Decimal128,
	salePrice: Schema.Types.Decimal128,
	task: String,
});

const Report = mongoose.model('Report', ReportSchema);
module.exports = Report;
