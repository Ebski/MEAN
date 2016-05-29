/**
 * Created by Ebbe on 29-05-2016.
 */
var express = require('express');
var app = express();


app.get('/', function (req, res, next) {
    res.send('Hello World');
    next();
});

app.get('/users/', function (req, res, next) {
    var users = [
        {
            name: "Hans",
            age: 22
        },
        {
            name: "Jytte",
            age: 24
        }
    ];
    res.send(users);
    next();
});

app.get('/animals', function (req, res, next) {
    var animals = [
        cow,
        'dog'
    ]
    res.send(animals);
    next();
});

//app.use(function(req, res, next) {
//    console.log("I'm not writing next so the timestamp wont show");
//})

app.use(function (req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({error: 'Something failed!'});
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {error: err});
}

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
app.listen(3000, function () {
    console.log("Server running at http://localhost:3000");
});