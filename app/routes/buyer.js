var fs = require('fs');
var Buyer = require('../models/buyer');

function init(router, passport) {
    router.get('/', findAll);
    router.get('/:id', findById);
    router.post('/', create);
    router.put('/:id', update);
    router.delete('/:id', remove);
}

function findAll(request, response, next) {
    Buyer.findAll(function (error, buyers) {
        if (error) {
            return response.send(error);
        }
        var status = buyers.length ? 200 : 204;
        response.status(status).json(buyers);
    });
}

function findById(request, response, next) {
    var id = request.params.id;
    Buyer.findById(id, function (error, buyer) {
        if (error) {
            return response.send(error);
        }
        var status = (buyer && buyer._id) ? 200 : 204;
        response.status(status).json(buyer);
    });
}

function create(request, response, next) {
    var attrs = request.body;
    Buyer.create(attrs, function (error, buyer) {
        if (error) {
            return response.send(error);
        }
        response.status(201).json('Object creation successful.');
    });
}

function update(request, response, next) {
    var id = request.params.id,
        attrs = request.body;
    Buyer.update(id, attrs, function (error, rawMessage) {
        if (error) {
            return response.send(error);
        }
        response.status(200).json('Object updation successful');
    });
}

function remove(request, response, next) {
    var id = request.params.id;
    Buyer.remove(id, function (error) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object deletion successful');
    });
}

module.exports = init;