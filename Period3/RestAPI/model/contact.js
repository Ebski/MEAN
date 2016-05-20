/**
 * Created by Ebbe on 18-05-2016.
 */
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/contactlist");
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    number: String,
    created: {
        type: Date,
        default: Date.now
    }
});

var Contact = mongoose.model("contactlist", contactSchema);
module.exports = Contact;