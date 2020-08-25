require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const compression = require('compression');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const userRoutes = require('./routes/user_routes');
const staticRoot = __dirname + '/src/';
// MONGO CONNECT
// var mongo_config = JSON.parse(process.env.APP_CONFIG);
// var mongo_connection_string_prod = "mongodb://" + mongo_config.mongo.user + ":" + process.env.MONGO_PASS + "@" + mongo_config.mongo.hostString;
// var mongo_connection_string = typeof (mongo_connection_string_prod) !== "undefined" ? mongo_connection_string_prod : mongo_connection_string_local;
let mongo_connection_string_local = "mongodb://localhost/runTimez";
let mongo_connection_string = mongo_connection_string_local;
mongoose.Promise = global.Promise;
mongoose.connect(mongo_connection_string, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true // anti depracation configs
},
  function (err, db) {
    if (err) {
      console.error("Error connecting to mongo", err);
    } else {
      console.log("Connected to mongo");
    }
  });
  // MONGO CONNECT


const app = express();
// const forceSSL = function() {
//     return function (req, res, next) {
//       if (req.headers['x-forwarded-proto'] !== 'https') {
//         return res.redirect(
//          ['https://', req.get('Host'), req.url].join('')
//         );
//       }
//       next();
//     }
//   }  // forceSSL middleware
  // app.use(forceSSL());
app.use(compression());
app.use(express.static(__dirname + '/dist/runTimez'));
app.use(bodyParser.json());
app.use(expressSession({ secret: 'Gotta go fast!',
 resave: true, saveUninitialized: true,
 store: new MongoStore({url: mongo_connection_string_local, secret: 'run mongo run'}) }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', userRoutes);
// app.use(express.static(__dirname + '/src'));
// app.use(express.static(__dirname + '/src/'+'index.html'));

// console.log('testing env? ', process.env.NODE_ENV);
console.log('static root is ',staticRoot);
app.use(express.static(staticRoot));
app.use(express.static(__dirname + '/src'));

// app.get('/*', function(req, res) {
//   console.log('triggered /* route. dirName is ', __dirname);
//     // res.sendFile('src/index.html', {root: path.dirname(__dirname+'/run-times/')})
//   });
// Start the app by listening on the default or Heroku port

// app.use(express.static(staticRoot + 'index.html'));


app.listen(process.env.PORT || 8000, () => {
  console.log('RunTimez listening on 8000');
});
