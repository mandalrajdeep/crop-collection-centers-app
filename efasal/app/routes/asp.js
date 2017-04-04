var fs = require('fs');
var ASP = require('../models/asp');

function init(router, passport) {
    router.get('/', findAll);
    router.get('/:id', findById);
    router.get('/search/query', findByAttrs);
    router.post('/', create);
    router.put('/:id', update);
    router.delete('/:id', remove);
}

function findAll(request, response, next) {
    ASP.findAll(function (error, asps) {
        if (error) {
            return response.send(error);
        }

        var status = asps.length ? 200 : 204;
        response.status(status).json(asps);
    });
}

function findById(request, response, next) {
    var id = request.params.id;
    ASP.findById(id, function (error, asp) {
        if (error) {
            return response.send(error);
        }

        var status = (asp && asp._id) ? 200 : 204;
        response.status(status).json(asp);
    });
}

function findByAttrs(request, response, next) {
    if (request.query.name != null && request.query.name !=''){
            ASP.findByName(request.query.name, function (error, asps) {
            if (error) {
                return response.send(error);
            }

            var status = asps.length ? 200 : 204;
            response.status(status).json(asps);
        });
    } else if (request.query.ccd != null && request.query.ccd !=''){
            ASP.findByCCD(request.query.ccd, function (error, asps) {
            if (error) {
                return response.send(error);
            }

            var status = asps.length ? 200 : 204;
            response.status(status).json(asps);
        });
    } else {
        ASP.findByArea(request.query, function (error, asps) {
            if (error) {
                return response.send(error);
            }

            var status = asps.length ? 200 : 204;
            response.status(status).json(asps);
        });
    }
}

function create(request, response, next) {
    var attrs = request.body;
    ASP.create(attrs, function (error, asp) {
        if (error) {
            return response.send(error);
        }

        response.status(201).json('Object creation successful.');
    });
}

function update(request, response, next) {
    var id = request.params.id,
        attrs = request.body;
    ASP.update(id, attrs, function (error, rawMessage) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object updation successful');
    });
}

function remove(request, response, next) {
    var id = request.params.id;
    ASP.remove(id, function (error) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object deletion successful');
    });
}

module.exports = init;