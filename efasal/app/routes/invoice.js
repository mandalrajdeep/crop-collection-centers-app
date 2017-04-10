var fs = require('fs');
var Invoice = require('../models/invoice');

function init(router, passport) {
    router.get('/', findAll);
    router.get('/:id', findById);
    router.get('/search/query', findByName);
    router.post('/', create);
    router.put('/:id', update);
    router.delete('/:id', remove);
}

function findAll(request, response, next) {
    Invoice.findAll(function (error, invoice) {
        if (error) {
            return response.send(error);
        }

        var status = invoice.length ? 200 : 204;
        response.status(status).json(invoice);
    });
}

function findById(request, response, next) {
    var id = request.params.id;
    invoice.findById(id, function (error, aginvoiceents) {
        if (error) {
            return response.send(error);
        }

        var status = (invoice && invoice._id) ? 200 : 204;
        response.status(status).json(invoice);
    });
}

function findByName(request, response, next) {
    var name = request.query.name;
    Invoice.findByName(name, function (error, invoice) {
        if (error) {
            return response.send(error);
        }

        var status = invoice.length ? 200 : 204;
        response.status(status).json(invoice);
    });
}

function create(request, response, next) {
    var attrs = request.body;
    Invoice.create(attrs, function (error, agent) {
        if (error) {
            return response.send(error);
        }

        response.status(201).json('Object creation successful.');
    });
}

function update(request, response, next) {
    var id = request.params.id,
        attrs = request.body;
    Invoice.update(id, attrs, function (error, rawMessage) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object updation successful');
    });
}

function remove(request, response, next) {
    var id = request.params.id;
    Invoice.remove(id, function (error) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object deletion successful');
    });
}

module.exports = init;