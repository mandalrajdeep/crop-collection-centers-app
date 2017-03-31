var fs = require('fs');

var User = require('../models/user').User;
var Token = require('../models/user').Token;
var Contact = require('../models/contact');

//var Roles = require('../config/roles.js');

// URL localhost:8080/contact/
module.exports = function(router, passport){

        // fetch all contacts by contact/
        router.get('/', function(req, res) {
            Contact.find(function(err, contact) {
            if (err)
                res.send(err);
            else res.json(contact);
            });
        });

        router.post('/', function(req, res) {
            var contact = new Contact();      // create a new instance of the Contact model
            contact.name = req.body.name;  
            contact.work.job_title = req.body.job_title;
            contact.work.organization = req.body.organization;
            var phones = req.body.phone;
            for (var phone in phones) {
                console.log(phone);
                 contact.phone.push({label: phone, value: phones[phone]});
            }
            var emails = req.body.email;
            for (var email in emails) {
                 contact.email.push({label: email, value: emails[email]});
            }
            contact.address.name = req.body.address.name;  // set the address  (comes from the request)
            contact.address.type = req.body.address.type;
            contact.address.locality = req.body.address.locality;
            contact.address.district = req.body.address.district;
            contact.address.state = req.body.address.state;
            contact.address.country = req.body.address.country;
            contact.address.pin = req.body.address.pin;
            // save the contact and check for errors
            contact.save(function(err) {
                if (err)
                    res.send(err);
                else res.json({ message: 'Contact created!' });
            });
        });

        // fetch one by contact/ID
		router.get('/:contact_id', function(req, res){
            Contact.findById(req.params.contact_id, function(err, contact) {
                if (err)
                    res.send(err);
                else res.json(contact);
            });
        });

        router.put('/:contact_id', function(req, res) {
            Contact.findById(req.params.contact_id, function(err, contact) {
                if (err)
                    res.send(err);
                else {
                    contact.name = req.body.name;  
                    contact.work.job_title = req.body.job_title;
                    contact.work.organization = req.body.organization;
                    var phones = req.body.phones;
                    for (var phone in phones) {
                        contact.phone.push({type: phone, value: phones[type]});
                    }
                    var emails = req.body.emails;
                    for (var email in phones) {
                        contact.email.push({type: email, value: emails[email]});
                    }
                    contact.address.name = req.body.title;  // set the address name (comes from the request)
                    contact.address.type = req.body.type;
                    contact.address.locality = req.body.locality;
                    contact.address.district = req.body.district;
                    contact.address.state = req.body.state;
                    contact.address.country = req.body.country;
                    contact.address.pin = req.body.pin;
                    // saving contact after update
                    contact.save(function(err) {
                        if (err)
                            res.send(err);
                        else res.json({ message: 'Contact updated!' });
                    });
                }
            });
        });

        router.delete('/:contact_id', function(req, res) {
            Contact.remove({
                _id: req.params.contact_id
            }, function (err, contact) {
                if (err)
                    res.send(err);
                else if (!contact)
                    res.send('Invalid ID for deletion');
                else res.json({message: 'Successfully Deleted'})
            })
        });

};
