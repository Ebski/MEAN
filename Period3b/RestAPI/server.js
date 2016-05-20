var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Contact = require("./model/contact");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//CRUD GET request
app.get('/contactlist', function (req, res) {
    Contact.find(function (err, docs) {
        res.json(docs);
    });
});

//CRUD POST request
app.post('/contactlist', function (req, res) {

    var newContact = new Contact({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number
    });

    newContact.save(function (err, doc) {
        res.json(doc);
    });
});

//CRUD DELETE request
app.delete('/contactlist/:id', function (req, res) {
    var id = req.params.id;

    Contact.remove({_id: id}, function (err, doc) {
        res.json(doc);
    })
});

app.get('/contactlist/:id', function (req, res) {
    var id = req.params.id;

    Contact.findOne({_id: id}, function (err, doc) {
        res.json(doc);
    })
});

//CRUD UPDATE request
app.put('/contactlist/:id', function (req, res) {
    var id = req.params.id;

    Contact.findOneAndUpdate({_id: id},
        {$set: {name: req.body.name, email: req.body.email, number: req.body.number}}, function (err, doc) {
            res.json(doc);
        })

});
module.exports = app;