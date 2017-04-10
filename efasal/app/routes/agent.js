var fs = require('fs');
var Agent = require('../models/agent');

function init(router, passport) {
    router.get('/', findAll);
    router.get('/:id', findById);
    router.get('/search/query', findByName);
    router.post('/', create);
    router.put('/:id', update);
    router.delete('/:id', remove);
}

function findAll(request, response, next) {
    Agent.findAll(function (error, agents) {
        if (error) {
            return response.send(error);
        }

        var status = agents.length ? 200 : 204;
        response.status(status).json(agents);
    });
}

function findById(request, response, next) {
    var id = request.params.id;
    Agent.findById(id, function (error, agents) {
        if (error) {
            return response.send(error);
        }

        var status = (agents && agents._id) ? 200 : 204;
        response.status(status).json(agents);
    });
}

function findByName(request, response, next) {
    var name = request.query.name;
    Agent.findByName(name, function (error, agents) {
        if (error) {
            return response.send(error);
        }

        var status = agents.length ? 200 : 204;
        response.status(status).json(agents);
    });
}

function create(request, response, next) {
    var attrs = request.body;
    Agent.create(attrs, function (error, agent) {
        if (error) {
            return response.send(error);
        }

        response.status(201).json('Object creation successful.');
    });
}

function update(request, response, next) {
    var id = request.params.id,
        attrs = request.body;
    Agent.update(id, attrs, function (error, rawMessage) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object updation successful');
    });
}

function remove(request, response, next) {
    var id = request.params.id;
    Agent.remove(id, function (error) {
        if (error) {
            return response.send(error);
        }

        response.status(200).json('Object deletion successful');
    });
}

module.exports = init;