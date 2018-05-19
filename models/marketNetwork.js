const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarketNetworkSchema = new Schema({
	name: {
		type: String,
	},
});

const MarketNetwork = mongoose.model('MarketNetwork', MarketNetworkSchema);
module.exports = MarketNetwork;
