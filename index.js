var express = require('express');
var app = express();

const bodyParser = require('body-parser'); // handling HTML body
var morgan = require('morgan'); // logging
var mongoose = require('mongoose'); // Mongodb library

var config = require('./config'); // global config

var Users = require('./controllers/userController'); // Import User controller
var Vocabs = require('./controllers/vocabController'); // Import User controller

var port = process.env.PORT || config.port // load port config
app.set('port', port);

// app.set('superSecret', config.secret); // secret variable

//Set up default mongoose connection
var mongoDB = config.database;
mongoose.connect(mongoDB, {
    useMongoClient: true
});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// use body parser so we can get info from POST and/or URL params
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.listen(app.get('port'), () => {
    console.log('Simple API started at http://localhost:' + port);
});

app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.get('/users', function (req, res) {
    Users.getUsers(req, res);
});

app.post('/user', function (req, res) {
    Users.addNewUser(req, res);
});

app.post('/vocab', function (req, res) {
    Vocabs.addNewWord(req, res);
});

app.get('/vocabs', function (req, res) {
    Vocabs.getVocabs(req, res);
});

app.get('/vocabs/:uid', function (req, res) {
    Vocabs.getVocabsByUid(req, res);
})
 