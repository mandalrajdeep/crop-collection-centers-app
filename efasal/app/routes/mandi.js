var fs = require('fs');

var User = require('../models/user').User;
var Token = require('../models/user').Token;
var Mandi = require('../models/mandi');
var Contact = require('../models/contact');

//var Roles = require('../config/roles.js');

// URL localhost:8080/mandi/
module.exports = function(router, passport){

        // fetch all Mandis by mandi/
        router.get('/', function(req, res) {
            Mandi.find(function(err, mandis) {
            if (err)
                res.send(err);
            else res.json(mandis);
            });
        });

        router.post('/', function(req, res) {

            var mandi = new Mandi();      // create a new instance of the Mandi model
            mandi.name = req.body.name;  // set the mandi name (comes from the request)
            mandi.address.name = req.body.address.name;  // set the address  (comes from the request)
            mandi.address.type = req.body.address.type;
            mandi.address.locality = req.body.address.locality;
            mandi.address.district = req.body.address.district;
            mandi.address.state = req.body.address.state;
            mandi.address.country = req.body.address.country;
            mandi.address.pin = req.body.address.pin;
            mandi.contact = new Contact();
            mandi.addContact(req.body.contact._id);
            mandi.save(function(err) {
                if (err)
                    res.send(err);
            });
            // mandi.contact = "LALA";
            // mandi.contact = Contact.findById(req.body.contact._id, function (err, person){
            //     if (err)
            //         res.send(err);
            //     return person._id;
            // });
            // var contacts = req.body.contact;
            // for (var contact in contacts) {
            //     mandi.contact.push(Contact.findById(contacts[contact]._id), function(err){
            //         if (errr)
            //             res.send(err);
            //         console.log(mandi)
            //     })

            //     console.log(contacts[contact]._id);
            //     Contact.findById(contacts[contact]._id, function(err, person){
            //         if (err)
            //             res.send(err);
            //         else mandi.contact.push(person, function(err){
            //             if (err) {
            //                 console.log('Fail');
            //                 res.send(err);
            //             } MyClass.findById(req.params.id)
            //         });
            //     })
            // }
            console.log(mandi);

            // mandi.save(function(err) {
            //     if (err)
            //         res.send(err);
            //     else res.json({ message: 'Mandi added!' });
            // });

            // save the mandi and check for errors
        });
};
