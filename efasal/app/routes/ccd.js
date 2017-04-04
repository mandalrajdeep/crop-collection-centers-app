var fs = require('fs');
var CCD = require('../models/ccd');

function init(router, passport) {
    router.get('/', findAll);
    router.get('/:id', findById);
    router.post('/', create);
    router.put('/:id', update);
    router.delete('/:id', remove);
}

function findAll(request, response, next) {
    CCD.findAll(function (error, ccds) {
        if (error) {
            return response.send(error);
        }
        var status = ccds.length ? 200 : 204;
        response.status(status).json(ccds);
    });
}

function findById(request, response, next) {
    var id = request.params.id;
    CCD.findById(id, function (error, ccd) {
        if (error) {
            return response.send(error);
        }
        var status = (ccd && ccd._id) ? 200 : 204;
        response.status(status).json(ccd);
    });
}

function create(request, response, next) {
    var attrs = request.body;
    CCD.create(attrs, function (error, ccd) {
        if (error) {
            return response.send(error);
        }
        response.status(201).json('Object creation successful.');
    });
}

function update(request, response, next) {
    var id = request.params.id,
        attrs = request.body;
    CCD.update(id, attrs, function (error, rawMessage) {
        if (error) {
            return response.send(error);
        }
        response.status(200).json('Object updation successful');
    });
}

function remove(request, response, next) {
    var id = request.params.id;
    CCD.remove(id, function (error) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object deletion successful');
    });
}

module.exports = init;