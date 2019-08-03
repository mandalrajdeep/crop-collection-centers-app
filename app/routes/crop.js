var fs = require('fs');
var Crop = require('../models/crop');

function init(router, passport) {
    router.get('/', findAll);
    router.get('/:id', findById);
    router.get('/search/query', findByAttrs);
    router.post('/', create);
    router.put('/:id', update);
    router.delete('/:id', remove);
}

function findAll(request, response, next) {
    Crop.findAll(function (error, crop) {
        if (error) {
            return response.send(error);
        }
        var status = crop.length ? 200 : 204;
        response.status(status).json(crop);
    });
}

function findById(request, response, next) {
    var id = request.params.id;
    Crop.findById(id, function (error, crop) {
        if (error) {
            return response.send(error);
        }
        var status = (crop && crop._id) ? 200 : 204;
        response.status(status).json(crop);
    });
}

function findByAttrs(request, response, next) {
    if (request.query.name != null) {
        Crop.findByName(request.query.name, function (error, crops) {
            if (error) {
                return response.send(error);
            }

            var status = crops.length ? 200 : 204;
            response.status(status).json(crops);
        });
    }
    else {
        response.status(405).json('Invalid query');
    }
}

function create(request, response, next) {
    var attrs = request.body;
    Crop.create(attrs, function (error, crop) {
        if (error) {
            return response.send(error);
        }
        response.status(201).json('Object creation successful.');
    });
}

function update(request, response, next) {
    var id = request.params.id,
        attrs = request.body;
    Crop.update(id, attrs, function (error, rawMessage) {
        if (error) {
            return response.send(error);
        }
        response.status(200).json('Object updation successful');
    });
}

function remove(request, response, next) {
    var id = request.params.id;
    Crop.remove(id, function (error) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object deletion successful');
    });
}

module.exports = init;