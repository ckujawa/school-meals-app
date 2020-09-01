var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const LineItemSchema = new Schema({
    amount: Number,
    frequency: String,
    hourlyHours: Number,
    hourlyPeriod: String,
    id: String
});

module.exports = mongoose.model("LineItem", LineItemSchema);