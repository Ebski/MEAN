/**
 * Created by Ebbe on 29-05-2016.
 */
var express = require('express');
var app = express();
var cluster = require('cluster');

app.get('/', function(req,res) {
    res.send('Hello World');
});

if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length;

    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    cluster.on('exit', function () {
        cluster.fork();
    });
} else {
    app.listen(process.env.PORT || 3000, function () {
        console.log('Server listening on port 3000');
    })
}

