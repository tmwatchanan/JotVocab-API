var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Vocab', new Schema({
    uid: { type: Number, required: true, unique: true },
    words: []
}), 'vocabs');