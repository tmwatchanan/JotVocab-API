var config = require('../config');

var mongoose = require('mongoose');
var User = require('../models/User'); // Import User model

exports.getUsers = function (req, res) {
    User.find((err, users) => { // Define what to do
        if (err) throw err; // when query finished.
        res.json(users); // Using respond obj to
    }); // return users as JSON.
};

// exports.addNewUser = function (req, res) {
//     User.findByIdAndUpdate(
//         // info._id,
//         req.body.uid,
//         {$push: {"words": {word: req.body.word, comment: req.body.comment}}},
//         {safe: true, upsert: true, new : true},
//         function(err, model) {
//             console.log(err);
//         }
//     );
// };

exports.addNewUser = function (req, res) {
    var newUser = new User({
        id: req.body.uid, // Firebase uid
        name: req.body.name,
        email: req.body.email
    });
    newUser.save(function (err, user) {
        if (err) {
            return res.json({
                success: false,
                message: 'Unable to add new user!',
            });
        } else {
            return res.json({
                success: true,
                message: 'New user has been created',
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email
                }
            });
        }
    });
};

exports.addNewUser = function (req, res) {
    User.find({}).sort({
        id: -1
    }).limit(1).exec((err, users) => {
        if (err) throw err;
        if (users && users.length != 0) {
            var newUser = new User({
                id: users[0].id + 1, // users is an array of User objects
                name: req.body.name,
                age: parseInt(req.body.age),
                email: req.body.email,
                salt: pwd_data.salt,
                passwordhash: pwd_data.passwordHash,
                admin: req.body.admin ? req.body.admin : false
            });
            newUser.save(function (err, user) {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Unable to add new user!',
                    });
                } else {
                    return res.json({
                        success: true,
                        message: 'New user has been created',
                        user: {
                            name: newUser.name,
                            email: newUser.email,
                            admin: newUser.admin
                        }
                    });
                }
            });
        } else {
            res.json({
                success: false,
                message: 'User cannot be added!'
            });
        }
    });
};