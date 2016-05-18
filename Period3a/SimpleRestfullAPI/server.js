/**
 * Created by Ebbe on 18-05-2016.
 */
var express = require('express'),
    restful = require('node-restful'),
    mongoose = restful.mongoose,
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var app = express();

app.use(bodyParser());
app.use(methodOverride());


mongoose.connect('mongodb://localhost/restful');

var ProductSchema = mongoose.Schema({
    name: String,
    price: Number
});
var Products = restful.model('products', ProductSchema);
Products.methods(['get', 'put', 'post', 'delete']);
Products.register(app, '/api/products');

app.listen(3000);
console.log('Server is running at port 3000');