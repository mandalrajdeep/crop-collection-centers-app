var fs = require('fs');
var Contract = require('../models/contract');

function init(router, passport) {
    router.get('/', findAll);
    router.get('/:id', findById);
    router.post('/', create);
    router.put('/:id', update);
    router.delete('/:id', remove);
}

function findAll(request, response, next) {
    Contract.findAll(function (error, contracts) {
        if (error) {
            return response.send(error);
        }
        var status = contracts.length ? 200 : 204;
        response.status(status).json(contracts);
    });
}

function findById(request, response, next) {
    var id = request.params.id;
    Contract.findById(id, function (error, contracts) {
        if (error) {
            return response.send(error);
        }
        var status = (contracts && contracts._id) ? 200 : 204;
        response.status(status).json(contracts);
    });
}

function create(request, response, next) {
    var attrs = request.body;
    Contract.create(attrs, function (error, contracts) {
        if (error) {
            return response.send(error);
        }
        response.status(201).json('Object creation successful.');
    });
}

function update(request, response, next) {
    var id = request.params.id,
        attrs = request.body;
    Contract.update(id, attrs, function (error, rawMessage) {
        if (error) {
            return response.send(error);
        }
        response.status(200).json('Object updation successful');
    });
}

function remove(request, response, next) {
    var id = request.params.id;
    Contract.remove(id, function (error) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object deletion successful');
    });
}

module.exports = init;