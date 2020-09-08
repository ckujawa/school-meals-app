var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const appDataSchema = new Schema({
    field1: Object,
    status: {type: String, default: 'new'}
    });

module.exports = mongoose.model("AppData", appDataSchema);