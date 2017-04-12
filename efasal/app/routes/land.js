var fs = require('fs');
var Land = require('../models/land');

function init(router, passport) {
    router.get('/', findAll);
    router.get('/:id', findById);
    router.get('/search/query', findByAttrs);
    router.post('/', create);
    router.put('/:id', update);
    router.delete('/:id', remove);
}

function findAll(request, response, next) {
    Land.findAll(function (error, lands) {
        if (error) {
            return response.send(error);
        }
        var status = lands.length ? 200 : 204;
        response.status(status).json(lands);
    });
}

function findById(request, response, next) {
    var id = request.params.id;
    Land.findById(id, function (error, lands) {
        if (error) {
            return response.send(error);
        }
        var status = (lands && lands._id) ? 200 : 204;
        response.status(status).json(lands);
    });
}

function findByAttrs(request, response, next) {
    if (request.query.farmer != null) {
        Land.findByFarmer(request.query.farmer, function (error, lands) {
            if (error) {
                return response.send(error);
            }

            var status = lands.length ? 200 : 204;
            response.status(status).json(lands);
        });
    }
    else {
        response.status(405).json('Invalid query');
    }
}

function create(request, response, next) {
    var attrs = request.body;
    Land.create(attrs, function (error, lands) {
        if (error) {
            return response.send(error);
        }
        response.status(201).json('Object creation successful.');
    });
}

function update(request, response, next) {
    var id = request.params.id,
        attrs = request.body;
    Land.update(id, attrs, function (error, rawMessage) {
        if (error) {
            return response.send(error);
        }
        response.status(200).json('Object updation successful');
    });
}

function remove(request, response, next) {
    var id = request.params.id;
    Land.remove(id, function (error) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object deletion successful');
    });
}

module.exports = init;