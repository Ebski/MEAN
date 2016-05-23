var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var port = process.env.PORT || 8080;
var jwt = require('jwt-simple');

var routes = require('./routes/index');
var users = require('./routes/users');
var restApi = require('./routes/api');
var config = require('./config/database'); // get db config file
var User = require('./models/user'); // get the mongoose model

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
var passport = require("passport");
var passportConfig = require("./config/passport");
passportConfig(passport);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));

app.use(passport.initialize());


app.use('/', routes);
app.use('/users', users);
app.use('/api', function(req, res, next) {
    passport.authenticate('jwt', {session: false}, function(err, user, info) {
        if (err) { res.status(403).json({mesage:"Token could not be authenticated",fullError: err}) }
        if (user) { return next(); }
        return res.status(403).json({mesage: "Token could not be authenticated", fullError: info});
    })(req, res, next);
});
app.use('/api', restApi);


app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
