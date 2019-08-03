var fs = require('fs');
var Alloc = require('../models/allocation');

function init(router, passport) {
    router.get('/', findAll);
    router.get('/:id', findById);
    router.get('/search/query', findByAttrs);
    router.post('/', create);
    router.put('/:id', update);
    router.delete('/:id', remove);
}

function findAll(request, response, next) {
    Alloc.findAll(function (error, allocs) {
        if (error) {
            return response.send(error);
        }
        var status = allocs.length ? 200 : 204;
        response.status(status).json(allocs);
    });
}

function findById(request, response, next) {
    var id = request.params.id;
    Alloc.findById(id, function (error, allocs) {
        if (error) {
            return response.send(error);
        }
        var status = (allocs && allocs._id) ? 200 : 204;
        response.status(status).json(allocs);
    });
}

function findByAttrs(request, response, next) {
    if (request.query.farmer != null) {
        Alloc.findByFarmer(request.query.farmer, function (error, allocs) {
            if (error) {
                return response.send(error);
            }

            var status = allocs.length ? 200 : 204;
            response.status(status).json(allocs);
        });
    }
    else {
        response.status(405).json('Invalid query');
    }
}

function create(request, response, next) {
    var attrs = request.body;
    Alloc.create(attrs, function (error, allocs) {
        if (error) {
            return response.send(error);
        }
        response.status(201).json('Object creation successful.');
    });
}

function update(request, response, next) {
    var id = request.params.id,
        attrs = request.body;
    Alloc.update(id, attrs, function (error, rawMessage) {
        if (error) {
            return response.send(error);
        }
        response.status(200).json('Object updation successful');
    });
}

function remove(request, response, next) {
    var id = request.params.id;
    Alloc.remove(id, function (error) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object deletion successful');
    });
}

module.exports = init;