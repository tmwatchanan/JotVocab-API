var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Word', new Schema({
    uid: { type: Number, required: true, unique: true },
    word: { type: String, required: true, trim: true },
    comment: { type: String, required: true, trim: true },
    created: { type: Date, default: Date.now }
}));