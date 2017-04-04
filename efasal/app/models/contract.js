var mongoose = require('mongoose');
var contractSchema = require('../schemas/contract');

var Contract = mongoose.model('Contract', contractSchema);
var queryParams = contractSchema._queryParams;

function execQuery(query, callback) {
    query.select(queryParams.select)
        .populate(queryParams.populate)
        .exec(callback);
}

function _findRaw(attrs, callback) {
    Contract.find(attrs || {}).exec(callback);
}

function _find(attrs, callback) {
    var query = Contract.find(attrs || {});
    execQuery(query, callback);
}

function _findOne(attrs, callback) {
    var query = Contract.findOne(attrs || {});
    execQuery(query, callback);
}

function _findByAttributes(attrs, callback) {
    _find(attrs, function (error, contracts) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, contracts);
    })
}

function findAll(callback) {
    _find({}, function (error, contracts) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, contracts);
    });
}

function findById(id, callback) {
    _findOne({ _id: id }, function (error, contracts) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, contracts);
    });
}

function create(attrs, callback) {
    // Here you can validate and sanitize 'attrs' before creating
    Contract.create(attrs, function (error, contracts) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, contracts);
    });
}

function update(id, attrs, callback) {
    // Here you can validate and sanitize 'attrs' before updating
    Contract.update({ _id: id }, attrs, function (error, rawMessage) {
        if (error) {
            return handleError(error, callback);
        }
        callback(null, rawMessage);
    });
}

function remove(id, callback) {
    Contract.remove({ _id: id }, function (error) {
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
    create: create,
    update: update,
    remove: remove
};