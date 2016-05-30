/**
 * Created by Ebbe on 19-05-2016.
 */
var expect = require("chai").expect;
var server = require("../server");
var http = require("http");
var request = require("request");
var s;

beforeEach(function (done) {
    s = http.createServer(server);
    s.listen('3000', function () {
        done();
    })
})

afterEach(function (done) {
    s.close();
    done();
})

describe("RESTAPI", function () {

    describe("Create, update and delete", function () {
        var id;

        it("Adds a contact to the database", function (done) {
            var contact = {
                name: "newContact",
                email: "newContact@testemail.com",
                number: 77777777
            };

            var optionsCreate = {
                url: "http://localhost:3000/contactlist",
                method: "POST",
                json: true,
                body: contact
            };

            request(optionsCreate, function (err, res, body) {
                var name = body.name;
                id = body._id;
                expect(name).to.be.equal("newContact");
                done();
            })
        });


        it("Should update the newly created contact", function (done) {

            var updatedContact = {
                name: "updatedContact",
                email: "updatedContact@testemail.com",
                number: 77777777
            };

            var optionsUpdate = {
                url: "http://localhost:3000/contactlist/" + id,
                method: "PUT",
                json: true,
                body: updatedContact
            };

            request(optionsUpdate, function (err, res, body) {
                var email = body.email;
                expect(email).to.be.equal("newContact@testemail.com");
                done();
            })
        })

        it("Should delete the newly updated contact", function(done) {
            var optionsDelete = {
                url: "http://localhost:3000/contactlist/" + id,
                method: "DELETE",
                json: true
            }

            request(optionsDelete, function(err,res,body) {
                var docsRemoved = body.n;
                expect(docsRemoved).to.be.equal(1);
                done();
            })
        });
    });

    describe("Read", function () {
        var options = {
            url: "http://localhost:3000/contactlist",
            method: "GET",
            json: true
        };

        it("Checks that the database is not empty", function (done) {
            request(options, function (err, res, body) {
                var contacts = body;
                expect(contacts).to.not.be.empty;
                done();
            });
        });

        it("Checks if 'Bubber' is in the database", function (done) {
            request(options, function (err, res, body) {
                var bubber;

                function checkForBubber(element, index, array) {
                    if (element.name = "Bubber") {
                        bubber = element.name;
                    }
                }

                var contactnames = body;
                contactnames.forEach(checkForBubber);
                expect(bubber).to.equal("Bubber");
                done();
            })
        })
    });
});