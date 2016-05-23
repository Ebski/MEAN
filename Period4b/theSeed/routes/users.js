var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database'); // get db config file
var User = require('../models/user');
var jwt = require('jwt-simple');
const jwtConfig = require("../config/jwtConfig").jwtConfig;



// demo Route (GET http://localhost:8080)

// connect to database
mongoose.connect(config.database);

// pass passport for configuration
require('../config/passport')(passport);

// bundle our routes

// create a new user account (POST http://localhost:8080/users/signup)
router.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

// route to authenticate a user (POST http://localhost:8080/users/authenticate)
router.post('/authenticate', function(req, res) {
  User.findOne({
    userName: req.body.userName
  }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).send({ msg: 'Authentication failed. User not found.'});
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var iat = new Date().getTime()/1000; //convert to seconds
          var exp = iat+jwtConfig.tokenExpirationTime;
          var payload = {
            aud: jwtConfig.audience,
            iss: jwtConfig.issuer,
            iat: iat,
            exp: exp,
            sub: user.userName
          }
          var token = jwt.encode(payload, jwtConfig.secret);
          // return the information including token as JSON
          res.json({token: 'JWT ' + token});
        } else {
          res.status(401).send({ msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

module.exports = router;
