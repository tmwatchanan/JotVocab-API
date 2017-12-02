var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// module.exports = mongoose.model('User', new Schema({
//     uid: { type: Number, required: true, unique: true },
//     words: [],
//     created: { type: Date, default: Date.now }
// }, { collection: 'users' }));

module.exports = mongoose.model('User', new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
    created: { type: Date, default: Date.now },
    words: []
}));