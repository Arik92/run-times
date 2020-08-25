const express = require('express');
const router = express.Router();
let passport = require('passport');
let localStrategy = require('passport-local').Strategy;

let fbStrategy = require('passport-facebook').Strategy; // there might be more than one strategy
let user = require('../models/user');
const User = require('../models/user');

// configure localStrategy

passport.use(new localStrategy(
  function(username, password, done) {
    console.log('local strategy');
    console.log('username is ', username);
    console.log('password is ', password);

    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// Configure the Facebook strategy for use by Passport.
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new fbStrategy({
    clientID: process.env['FACEBOOK_CLIENT_ID'],
    clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
    callbackURL: '/users/fbreturn',
    profileFields: ["id", "displayName"] 
  }, (accessToken, refreshToken, profile, cb) => {    
    
    user.findOne({facebook_id: profile.id}, (err, res) => {
      if (err) {
        console.error('error finding fb user on DB', err);
      } else {
        if (!res) {
          console.log('creating new user ');
          // no user found. create a new one from scratch
          let newUser = new user({});          
          newUser.facebook_id = profile.id;
          newUser.name = profile.displayName;
          newUser.runData = [];
          
          newUser.save((saveErr, savedUser) => {
            if (saveErr) {
              console.log('error creating new user ', saveErr)
            } else {              
              return cb(null, savedUser);
            }
          })
        } else {
          console.log('useralready in the system');
          // user exists, returning it
          return cb(null, res);
        }
      }
    });

  }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// local routes
router.post('/signup', async (req, res) => {
  console.log('body is ', req.body);
  console.log('got into signup');
  const username = req.body.username;
  const foundUser = await user.findOne({name: username});
  if (foundUser) {
    console.log('found user? ', foundUser);
    res.send({"message":"a user with this name already exists!"});
  } else {
    const newUser = new user({});
    newUser.name = username;
    newUser.password = req.body.password;
    newUser.runData = [];
    await newUser.save();
    res.send({"message":"user successfully saved"});
  }
})
router.get('/login/local', passport.authenticate('local', { failureRedirect: '/#/login', successRedirect: '/#/stats',
failureFlash: true }));
// local

// FB routes
router.get('/login/facebook', passport.authenticate('facebook'), (req, res) =>{
}, (err) =>{
  console.log('err? ', err)
});
// fb-strategy required path
router.get('/fbreturn', passport.authenticate('facebook', { failureRedirect: '/#/login', successRedirect: '/#/stats',
failureFlash: true })); 
router.get('/user', (req, res) => {
    console.log('user is ', req.user);
  res.send(req.user);
});
// FB routes

router.get('/logout', (req, res) => {    
    req.logOut();
    res.redirect('/');
  });
  router.get('/details', (req, res) => {    
    res.send(req.user);
  });

  
module.exports = router;
