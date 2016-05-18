/**
 * Created by Ebbe on 18-05-2016.
 */
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/contactlist");
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    name: String,
    email: String,
    number: String
});

var Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;