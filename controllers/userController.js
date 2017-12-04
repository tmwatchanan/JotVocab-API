var config = require('../configs/globalConfig');

var mongoose = require('mongoose');
var User = require('../models/User'); // Import User model

exports.getUsers = function (req, res) {
    User.find((err, users) => { // Define what to do
        if (err) throw err; // when query finished.
        res.json(users); // Using respond obj to
    }); // return users as JSON.
};

// exports.addNewUser = function (req, res) {
//     var newUser = new User({
//         id: req.body.uid, // Firebase uid
//         name: req.body.name,
//         email: req.body.email
//     });
//     newUser.save(function (err, user) {
//         if (err) {
//             return res.json({
//                 success: false,
//                 message: 'Unable to add new user!',
//             });
//         } else {
//             return res.json({
//                 success: true,
//                 message: 'New user has been created',
//                 user: {
//                     id: newUser.id,
//                     name: newUser.name,
//                     email: newUser.email
//                 }
//             });
//         }
//     });
// };
