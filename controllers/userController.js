var config = require('../config');

var mongoose = require('mongoose');
var User = require('../models/User'); // Import User model

exports.getUsers = function (req, res) {
    User.find((err, users) => { // Define what to do
        if (err) throw err; // when query finished.
        res.json(users); // Using respond obj to
    }); // return users as JSON.
};

exports.login = function (req, res) {
    console.log("req.body=" + JSON.stringify(req.body));
    console.log("req.body.uid=" + req.body.uid);
    console.log("req.body.word=" + req.body.word);
    console.log("req.body.comment=" + req.body.comment);
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else if (user) {
            
        } // end of else if(user)
    }); // end of the callback function
};

exports.addNewWord = function (req, res) {
    User.findByIdAndUpdate(
        // info._id,
        req.body.uid,
        { $push: { "words": { word: req.body.word, comment: req.body.comment } } },
        { safe: true, upsert: true, new: true },
        function (err, model) {
            console.log(err);
        }
    );
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
