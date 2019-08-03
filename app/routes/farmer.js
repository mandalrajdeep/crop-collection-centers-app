var fs = require('fs');
var Farmer = require('../models/farmer');

function init(router, passport) {
    router.get('/', findAll);
    router.get('/:id', findById);
    router.get('/search/query', findByAttrs);
    router.post('/', create);
    router.put('/:id', update);
    router.delete('/:id', remove);
}

function findAll(request, response, next) {
    Farmer.findAll(function (error, farmers) {
        if (error) {
            return response.send(error);
        }

        var status = farmers.length ? 200 : 204;
        response.status(status).json(farmers);
    });
}

function findById(request, response, next) {
    var id = request.params.id;
    Farmer.findById(id, function (error, farmer) {
        if (error) {
            return response.send(error);
        }

        var status = (farmer && farmer._id) ? 200 : 204;
        response.status(status).json(farmer);
    });
}

function findByAttrs(request, response, next) {
    if (request.query.name != null && request.query.name !=''){
            Farmer.findByName(request.query.name, function (error, farmers) {
            if (error) {
                return response.send(error);
            }

            var status = farmers.length ? 200 : 204;
            response.status(status).json(farmers);
        });
    } else if ((request.query.ccd != null && request.query.ccd !='') || 
    (request.query.asp != null && request.query.asp !='')) {
            Farmer.findByCCD(request.query, function (error, farmers) {
            if (error) {
                return response.send(error);
            }

            var status = farmers.length ? 200 : 204;x``
            response.status(status).json(farmers);
        });
    } else {
            Farmer.findByArea(request.query, function (error, farmers) {
            if (error) {
                return response.send(error);
            }

            var status = farmers.length ? 200 : 204;
            response.status(status).json(farmers);
        });
    }
}

function create(request, response, next) {
    var attrs = request.body;
    Farmer.create(attrs, function (error, farmer) {
        if (error) {
            return response.send(error);
        }

        response.status(201).json('Object creation successful.');
    });
}

function update(request, response, next) {
    var id = request.params.id,
        attrs = request.body;
    Farmer.update(id, attrs, function (error, rawMessage) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object updation successful');
    });
}

function remove(request, response, next) {
    var id = request.params.id;
    Farmer.remove(id, function (error) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object deletion successful');
    });
}

module.exports = init;