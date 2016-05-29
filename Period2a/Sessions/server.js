/**
 * Created by Ebbe on 29-05-2016.
 */

var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
app.use(session({
    secret: 'bubber',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 20000}
}));

app.get('/', function (req, res, next) {
    var ses = req.session
    if (ses.views) {
        ses.views++
        ses.lastPage = '/'
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + ses.views + '</p>');
        res.write('<p>expires in: ' + (ses.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        ses.views = 1
        ses.lastPage = '/'
        res.end('welcome to the session demo. refresh!')
    }
})

app.get('/welcome', function (req, res) {
    var ses = req.session
        res.setHeader('Content-Type', 'text/html')
    res.write('<p> welcome! </p>')
    if (ses.lastPage) {
        if (ses.views) {
            ses.views++
        } else {
            ses.views = 1
        }
        res.write('<p>last page visited was: ' + ses.lastPage + '</p>');
        ses.lastPage = '/welcome';
        res.write('<p>expires in: ' + (ses.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        if (ses.views) {
            ses.views++
        } else {
            ses.views = 1
        }
        ses.lastPage = '/welcome';
        res.end('Welcome');
    }
});

app.get('/goodbye', function (req, res) {
    var ses = req.session
        res.setHeader('Content-Type', 'text/html')
        res.write('<p> Goodbye! </p>')
    if (ses.lastPage) {
        if (ses.views) {
            ses.views++
        } else {
            ses.views = 1
        }
        res.write('<p>last page visited was: ' + ses.lastPage + '</p>');
        ses.lastPage = '/goodbye'
        res.write('<p>expires in: ' + (ses.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        if (ses.views) {
            ses.views++
        } else {
            ses.views = 1
        }
        ses.lastPage = '/goodbye';
        res.end('Goodbye');
    }
});

app.get('/skiing', function (req, res) {
    var ses = req.session
        res.setHeader('Content-Type', 'text/html')
    res.write('<p> I REALLY LIKE SKIING! </p>')
    if (ses.lastPage) {
        if (ses.views) {
            ses.views++
        } else {
            ses.views = 1
        }
        res.write('<p>last page visited was: ' + ses.lastPage + '</p>');
        ses.lastPage = '/skiing';
        res.write('<p>expires in: ' + (ses.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        if (ses.views) {
            ses.views++
        } else {
            ses.views = 1
        }
        ses.lastPage = '/skiing';
        res.end('I REALLY LIKE SKIING');
    }
});

app.listen(process.env.PORT || 3000);
console.log("Server running on http://localhost:3000");