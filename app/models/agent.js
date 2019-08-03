var mongoose = require('mongoose');
var agentSchema = require('../schemas/agent');

var Agent = mongoose.model('Agent', agentSchema);
var queryParams = agentSchema._queryParams;

function execQuery(query, callback) {
    query.select(queryParams.select)
        .populate(queryParams.populate)
        .exec(callback);
}

function _findRaw(attrs, callback) {
    Agent.find(attrs || {}).exec(callback);
}

function _find(attrs, callback) {
    var query = Agent.find(attrs || {});
    execQuery(query, callback);
}

function _findOne(attrs, callback) {
    var query = Agent.findOne(attrs || {});
    execQuery(query, callback);
}

function _findByAttributes(attrs, callback) {
    _find(attrs, function (error, agents) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, agents);
    })
}

function findAll(callback) {
    _find({}, function (error, agents) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, agents);
    });
}

function findById(id, callback) {
    _findOne({ _id: id }, function (error, agent) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, agent);
    });
}

function findByName(name, callback) {
    _findByAttributes({ name: new RegExp('^'+name+'$', "i") }, function (error, agents) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, agents);
    });
}

function create(attrs, callback) {
    // Here you can validate and sanitize 'attrs' before creating
    Agent.create(attrs, function (error, agent) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, agent);
    });
}

function update(id, attrs, callback) {
    // Here you can validate and sanitize 'attrs' before updating
    Agent.update({ _id: id }, attrs, function (error, rawMessage) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, rawMessage);
    });
}

function remove(id, callback) {
    Agent.remove({ _id: id }, function (error) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null);
    });
}

function handleError(error, callback) {
    // Here you can use some Logger module or create your own to log errors
    callback(error);
}

module.exports = {
    findAll: findAll,
    findById: findById,
    findByName: findByName,
    create: create,
    update: update,
    remove: remove
};
