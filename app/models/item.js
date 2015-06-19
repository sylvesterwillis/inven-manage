var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ItemSchema   = new Schema({
    name: String,
    quantityInStock: Number,
    quantityGiven: Number
});

module.exports = mongoose.model('Item', ItemSchema);
