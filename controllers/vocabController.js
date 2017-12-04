var config = require('../config');

var mongoose = require('mongoose');
var Vocab = require('../models/Vocab'); // Import Vocab model

exports.addNewWord = function (req, res) {
    console.log("req.body=" + JSON.stringify(req.body));
    console.log("req.body.uid=" + req.body.uid);
    console.log("req.body.word=" + req.body.word);
    console.log("req.body.comment=" + req.body.comment);
    Vocab.findOne({ uid: req.body.uid }, function (err, vocabItem) {
        if (err) {
            console.log("MongoDB Error: " + err);
            return false; // or callback
        }
        if (!vocabItem) {
            console.log("No item found, creating vocabItem item");
            Vocab.create(
                {
                    uid: req.body.uid,
                    words: []
                }
            );
            // Vocab.create(
            //     {
            //         for_user: req.user._id,
            //         title: req.body[i].title,
            //         artist: req.body[i].artist,
            //         artwork: req.body[i].artwork,
            //         source: req.body[i].source,
            //         stream: req.body[i].stream
            //     }, function (err, createdItem) {
            //         if (err) {
            //             console.log("MongoDB Error: " + err);
            //             return null; // or callback
            //         }
            //     }
            // );
        }
        else {
            console.log("Found one tracksTable item: " + vocabItem.for_user);
            // here you could even update your existing item using "tracksTable.save"
        }
        var newWord = {
            word: req.body.word,
            comment: req.body.comment
        };
        Vocab.update({ uid: req.body.uid }, {
            $push: {
                words: newWord
            }
        }, { upsert: true }, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully added");
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
