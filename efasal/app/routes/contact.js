var fs = require('fs');
var Contact = require('../models/contact');

function init(router, passport) {
    router.get('/', findAll);
    router.get('/:id', findById);
    router.get('/search/query', findByName);
    router.post('/', create);
    router.put('/:id', update);
    router.delete('/:id', remove);
}

function findAll(request, response, next) {
    Contact.findAll(function (error, contacts) {
        if (error) {
            return response.send(error);
        }

        var status = contacts.length ? 200 : 204;
        response.status(status).json(contacts);
    });
}

function findById(request, response, next) {
    var id = request.params.id;
    Contact.findById(id, function (error, contact) {
        if (error) {
            return response.send(error);
        }

        var status = (contact && contact._id) ? 200 : 204;
        response.status(status).json(contact);
    });
}

function findByName(request, response, next) {
    var name = request.query.name;
    Contact.findByName(name, function (error, contacts) {
        if (error) {
            return response.send(error);
        }

        var status = contacts.length ? 200 : 204;
        response.status(status).json(contacts);
    });
}

function create(request, response, next) {
    var attrs = request.body;
    Contact.create(attrs, function (error, contact) {
        if (error) {
            return response.send(error);
        }

        response.status(201).json('Object creation successful.');
    });
}

function update(request, response, next) {
    var id = request.params.id,
        attrs = request.body;
    Contact.update(id, attrs, function (error, rawMessage) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object updation successful');
    });
}

function remove(request, response, next) {
    var id = request.params.id;
    Contact.remove(id, function (error) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object deletion successful');
    });
}

module.exports = init;