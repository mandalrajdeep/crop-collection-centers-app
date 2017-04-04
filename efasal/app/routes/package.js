var fs = require('fs');
var Package = require('../models/package');

function init(router, passport) {
    router.get('/', findAll);
    router.get('/:id', findById);
    router.get('/search/query', findByCrop);
    router.post('/', create);
    router.put('/:id', update);
    router.delete('/:id', remove);
}

function findAll(request, response, next) {
    Package.findAll(function (error, packs) {
        if (error) {
            return response.send(error);
        }
            console.log('err');

        var status = packs.length ? 200 : 204;
        response.status(status).json(packs);
    });
}

function findById(request, response, next) {
    var id = request.params.id;
    Package.findById(id, function (error, pack) {
        if (error) {
            return response.send(error);
        }

        var status = (pack && pack._id) ? 200 : 204;
        response.status(status).json(pack);
    });
}

function findByCrop(request, response, next) {
    var crop = request.query.crop;
    Package.findByCrop(crop, function (error, packs) {
        if (error) {
            return response.send(error);
        }

        var status = packs.length ? 200 : 204;
        response.status(status).json(packs);
    });
}

function create(request, response, next) {
    var attrs = request.body;
    Package.create(attrs, function (error, pack) {
        if (error) {
            return response.send(error);
        }

        response.status(201).json('Object creation successful.');
    });
}

function update(request, response, next) {
    var id = request.params.id,
        attrs = request.body;
    Package.update(id, attrs, function (error, rawMessage) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object updation successful');
    });
}

function remove(request, response, next) {
    var id = request.params.id;
    Package.remove(id, function (error) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object deletion successful');
    });
}

module.exports = init;