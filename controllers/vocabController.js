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
            // Check uniqueness of word & definition
            // userObject.words.forEach(eachWord => {
            //     if (eachWord.word == newWord.word && eachWord.definition == newWord.definition) {
            //         return res.status(401).json({
            //             success: false,
            //             newWord: newWord.word,
            //             newDefinition: newWord.definition,
            //             message: 'This word and defintion is ALREADY found in your vocabulary list!'
            //         });
            //     }
            // });
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
    }, (err, vocabs) => {
        // if (err) throw err;
        if (err) {
            var errMsg = '[uid:' + uid + '] vocabs not found!';
            return res.status(404).json({ // if not found, return
                success: false, // an error message
                message: errMsg,
                err: err
            });
        } else {
            if (vocabs && vocabs.length != 0) { // check an user's vocabs is found
                return res.json(vocabs);
            }
        }
    });
};

exports.deleteVocabByUid = function (req, res) {
    var uid = res.locals.uid;
    Vocab.update({ uid: uid }, { "$pull": { "words": { "word": req.body.word } }}, { safe: true, multi:true }, function(err, vocab) {
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
