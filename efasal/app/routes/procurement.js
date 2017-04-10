var fs = require('fs');
var Procurement = require('../models/procurement');

function init(router, passport) {
    router.get('/', findAll);
    router.get('/:id', findById);
    router.post('/', create);
    router.put('/:id', update);
    router.delete('/:id', remove);
}

function findAll(request, response, next) {
    Procurement.findAll(function (error, procs) {
        if (error) {
            return response.send(error);
        }
        var status = procs.length ? 200 : 204;
        response.status(status).json(procs);
    });
}

function findById(request, response, next) {
    var id = request.params.id;
    Procurement.findById(id, function (error, procs) {
        if (error) {
            return response.send(error);
        }
        var status = (procs && procs._id) ? 200 : 204;
        response.status(status).json(procs);
    });
}

function create(request, response, next) {
    var attrs = request.body;
    Procurement.create(attrs, function (error, procs) {
        if (error) {
            return response.send(error);
        }
        response.status(201).json('Object creation successful.');
    });
}

function update(request, response, next) {
    var id = request.params.id,
        attrs = request.body;
    Procurement.update(id, attrs, function (error, rawMessage) {
        if (error) {
            return response.send(error);
        }
        response.status(200).json('Object updation successful');
    });
}

function remove(request, response, next) {
    var id = request.params.id;
    Procurement.remove(id, function (error) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object deletion successful');
    });
}

module.exports = init;