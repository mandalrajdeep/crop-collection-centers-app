var fs = require('fs');
var Mandi = require('../models/mandi');

function init(router, passport) {
    router.get('/', findAll);
    router.get('/:id', findById);
    router.post('/', create);
    router.put('/:id', update);
    router.delete('/:id', remove);
}

function findAll(request, response, next) {
    Mandi.findAll(function (error, mandis) {
        if (error) {
            return response.send(error);
        }

        var status = mandis.length ? 200 : 204;
        response.status(status).json(mandis);
    });
}

function findById(request, response, next) {
    var id = request.params.id;
    Mandi.findById(id, function (error, mandi) {
        if (error) {
            return response.send(error);
        }

        var status = (mandi && mandi._id) ? 200 : 204;
        response.status(status).json(mandi);
    });
}

function create(request, response, next) {
    var attrs = request.body;
    Mandi.create(attrs, function (error, mandi) {
        if (error) {
            return response.send(error);
        }

        response.status(201).json('Object creation successful.');
    });
}

function update(request, response, next) {
    var id = request.params.id,
        attrs = request.body;
    Mandi.update(id, attrs, function (error, rawMessage) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object updation successful');
    });
}

function remove(request, response, next) {
    var id = request.params.id;
    Mandi.remove(id, function (error) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object deletion successful');
    });
}

module.exports = init;