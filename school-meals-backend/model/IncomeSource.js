var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LineItemSchema = require('./LineItem')


const IncomeSourceSchema = new Schema({
    has: Boolean,
    lineItems: [LineItemSchema]
});

module.exports = mongoose.model("IncomeSource", IncomeSourceSchema);