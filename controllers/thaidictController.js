var mongoose = require('mongoose');

var thaidict = require("thaidict");
thaidict.init();

exports.getThai = function (req, res) {
    res.json(thaidict.search("computer"));
};