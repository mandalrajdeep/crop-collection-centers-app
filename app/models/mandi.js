var mongoose = require('mongoose');
var MandiSchema = require('../schemas/mandi');

var Mandi = mongoose.model('Mandi', MandiSchema);
var queryParams = MandiSchema._queryParams;

function execQuery(query, callback) {
    query.select(queryParams.select)
        .populate(queryParams.populate)
        .exec(callback);
}

function _findRaw(attrs, callback) {
    Mandi.find(attrs || {}).exec(callback);
}

function _find(attrs, callback) {
    var query = Mandi.find(attrs || {});
    execQuery(query, callback);
}

function _findOne(attrs, callback) {
    var query = Mandi.findOne(attrs || {});
    execQuery(query, callback);
}

function _findByAttributes(attrs, callback) {
    _find(attrs, function (error, mandis) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, mandis);
    })
}

function findAll(callback) {
    _find({}, function (error, mandis) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, mandis);
    });
}

function findById(id, callback) {
    _findOne({ _id: id }, function (error, mandi) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, mandi);
    });
}

function create(attrs, callback) {
    // Here you can validate and sanitize 'attrs' before creating
    Mandi.create(attrs, function (error, mandi) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, mandi);
    });
}

function update(id, attrs, callback) {
    // Here you can validate and sanitize 'attrs' before updating
    Mandi.update({ _id: id }, attrs, function (error, rawMessage) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, rawMessage);
    });
}

function remove(id, callback) {
    Mandi.remove({ _id: id }, function (error) {
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
