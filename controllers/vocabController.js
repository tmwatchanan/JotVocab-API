var config = require('../configs/globalConfig');

var mongoose = require('mongoose');
var Vocab = require('../models/Vocab'); // Import Vocab model

exports.addNewWord = function (req, res) {
    var uid = res.locals.uid;
    var newWord = {
        word: req.body.word,
        definition: req.body.definition,
        comment: req.body.comment,
        timestamp: Date.now()
    };
    Vocab.findOne({ uid: uid }, function (err, userObject) {
        if (err) {
            console.log("MongoDB Error: " + err);
            return res.status(401).json({
                err: err
            });
            // return false; // or callback
        }
        if (!userObject) {
            // console.log("No item found, creating a new userObject");
            Vocab.create(
                {
                    uid: uid,
                    words: []
                }
            );
        }
        else {
            var isDuplicated = false;
            // Check uniqueness of word & definition
            for (let eachWord of userObject.words) {
                if (eachWord.word == newWord.word && eachWord.definition == newWord.definition) {
                    isDuplicated = true;
                    break;
                }
            }
            if (isDuplicated) {
                return res.status(401).json({
                    duplicate: true,
                    success: false,
                    newWord: newWord.word,
                    newDefinition: newWord.definition,
                    message: 'This word and defintion is ALREADY found in your vocabulary list!'
                });
            }
        }
        Vocab.update({ uid: uid }, {
            $push: {
                words: newWord
            }
        }, { upsert: true }, function (err) {
            if (err) {
                console.log(err);
                return res.status(401).json({
                    success: false,
                    message: err
                });
            } else {
                console.log("Successfully added");
                var sucessMsg = '[uid:' + uid + '] added word \'' + req.body.word + '\' successfully.';
                return res.json({
                    duplicate: false,
                    success: true,
                    message: sucessMsg,
                    wordComment: req.body.comment
                });
            }
        });
        return true; // or callback
    });
};

exports.getVocabs = function (req, res) {
    Vocab.find((err, vocabs) => { // Define what to do
        if (err) throw err; // when query finished.
        res.json(vocabs); // Using respond obj to
    }); // return users as JSON.
};

exports.getVocabsByUid = function (req, res) {
    var uid = res.locals.uid;
    Vocab.find({
        uid: uid
    }, (err, userObject) => {
        // if (err) throw err;
        if (err) {
            var errMsg = '[uid:' + uid + '] userObject not found!';
            return res.status(404).json({
                success: false,
                message: errMsg,
                err: err
            });
        } else {
            if (userObject && userObject.length != 0) { // check an userObject is found
                return res.json(userObject[0]); // return only the first only one
            }
        }
    });
};

exports.deleteVocabByUid = function (req, res) {
    var uid = res.locals.uid;
    Vocab.update({ uid: uid }, { "$pull": { "words": { "word": req.body.word, "definition": req.body.definition } }}, { safe: true, multi:true }, function(err, vocab) {
        if (err) {
            var errMsg = '[uid:' + uid + '] deleting \'' + req.body.word + '\' ERROR!';
            return res.status(404).json({ // if not found, return
                success: false, // an error message
                message: errMsg,
                err: err
            });
        } else {
            var successfulMessage = '[uid:' + uid + '] \'' + req.body.word + '\' has been DELETED.';
            return res.json({
                success: true,
                message: successfulMessage,
            });
        }
    });
}

exports.randomVocabByUid = function (req, res) {
    var uid = res.locals.uid;
    Vocab.find({
        uid: uid
    }, (err, userObject) => {
        // if (err) throw err;
        if (err) {
            var errMsg = '[uid:' + uid + '] userObject not found!';
            return res.status(404).json({ // if not found, return
                success: false, // an error message
                message: errMsg,
                err: err
            });
        } else {
            if (userObject && userObject.length != 0) { // check an userObject is found
                var randomIndex = Math.floor((Math.random() * userObject[0].words.length));
                var randomWord = userObject[0].words[randomIndex];
                return res.json(randomWord);
            }
        }
    });
}

exports.editVocabByUid = function (req, res) {
    var uid = res.locals.uid;
    Vocab.update(
        { uid: uid, 'words.word': req.body.word, 'words.definition': req.body.definition }, 
        {'$set': {
            'words.$.comment': req.body.comment
        }},
        function(err, editedWord) {
            if (err) {
                var errMsg = '[uid:' + uid + '] editing \'' + req.body.word + '\' ERROR!';
                return res.status(404).json({ // if not found, return
                    success: false, // an error message
                    message: errMsg,
                    err: err
                });
            } else {
                var successfulMessage = '[uid:' + uid + '] editing \'' + req.body.word + '\' (' + req.body.definition  + ') -> edit comment SUCCESSFUL';
                return res.json({
                    success: true,
                    message: successfulMessage,
                    // editedWord: editedWord
                });
            }
        }
    );
}
