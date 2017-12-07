var express = require('express');
var app = express();

const bodyParser = require('body-parser'); // handling HTML body
var morgan = require('morgan'); // logging
var mongoose = require('mongoose'); // Mongodb library
var admin = require("firebase-admin");

var config = require('./configs/globalConfig');

var Users = require('./controllers/userController'); // Import User controller
var Vocabs = require('./controllers/vocabController'); // Import User controller
var Thaidict = require('./controllers/thaidictController'); // Import thaidict controller

var port = process.env.PORT || config.port // load port config
app.set('port', port);

var cors = require('cors');
// Allow CORS
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

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

// Firebase- Admin
// console.log(process.env);
// Remote (Heroku's config vars)
// var serviceAccount = JSON.parse(process.env.serviceAccount);
// Local
var serviceAccount = require('./configs/jotvocab-firebase-adminsdk-6anlk-954de5add9.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://jotvocab.firebaseio.com"
});

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

app.get('/vocab/all', function (req, res) {
    Vocabs.getVocabs(req, res);
});

// node-thaidict
app.get('/thaidict/:enWord', function (req, res) {
    Thaidict.getThai(req, res);
});

app.use(function (req, res, next) {
    var IdToken = req.body.token;
    admin.auth().verifyIdToken(IdToken)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
    //   return res.json({
    //     success: true,
    //     message: "IdToken is successfully verified."
    //   });
      res.locals.uid = uid;
      next(); // continue to the sensitive route
    }).catch(function(err) { // Handle error
      return res.status(403).send({
        success: false,
        message: 'No/invalid token provided.',
        err: err
      });
    });
});

app.post('/vocab/user/list', function (req, res) {
    Vocabs.getVocabsByUid(req, res);
})

app.post('/vocab/user/add', function (req, res) {
    Vocabs.addNewWord(req, res);
});

app.delete('/vocab/user/delete', function (req, res) {
    Vocabs.deleteVocabByUid(req, res);
});
