var fs = require('fs');
var Delivery = require('../models/delivery');

function init(router, passport) {
    router.get('/', findAll);
    router.get('/:id', findById);
    router.post('/', create);
    router.put('/:id', update);
    router.delete('/:id', remove);
}

function findAll(request, response, next) {
    Delivery.findAll(function (error, delivery) {
        if (error) {
            return response.send(error);
        }
        var status = delivery.length ? 200 : 204;
        response.status(status).json(delivery);
    });
}

function findById(request, response, next) {
    var id = request.params.id;
    Delivery.findById(id, function (error, delivery) {
        if (error) {
            return response.send(error);
        }
        var status = (delivery && delivery._id) ? 200 : 204;
        response.status(status).json(delivery);
    });
}

function create(request, response, next) {
    var attrs = request.body;
    Delivery.create(attrs, function (error, delivery) {
        if (error) {
            return response.send(error);
        }
        response.status(201).json('Object creation successful.');
    });
}

function update(request, response, next) {
    var id = request.params.id,
        attrs = request.body;
    Delivery.update(id, attrs, function (error, rawMessage) {
        if (error) {
            return response.send(error);
        }
        response.status(200).json('Object updation successful');
    });
}

function remove(request, response, next) {
    var id = request.params.id;
    Delivery.remove(id, function (error) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object deletion successful');
    });
}

module.exports = init;