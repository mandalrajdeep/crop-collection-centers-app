var mongoose = require('mongoose');
var landSchema = require('../schemas/land');

var Land = mongoose.model('Land', landSchema);
var queryParams = landSchema._queryParams;

function execQuery(query, callback) {
    query.select(queryParams.select)
        .populate(queryParams.populate)
        .exec(callback);
}

function _findRaw(attrs, callback) {
    Land.find(attrs || {}).exec(callback);
}

function _find(attrs, callback) {
    var query = Land.find(attrs || {});
    execQuery(query, callback);
}

function _findOne(attrs, callback) {
    var query = Land.findOne(attrs || {});
    execQuery(query, callback);
}

function _findByAttributes(attrs, callback) {
    _find(attrs, function (error, lands) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, lands);
    })
}

function findAll(callback) {
    _find({}, function (error, lands) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, lands);
    });
}

function findById(id, callback) {
    _findOne({ _id: id }, function (error, lands) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, lands);
    });
}

function findByFarmer(id, callback) {
    _findByAttributes({ farmer: id }, function (error, lands) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, lands);
    });
}

function create(attrs, callback) {
    // Here you can validate and sanitize 'attrs' before creating
    Land.create(attrs, function (error, lands) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, lands);
    });
}

function update(id, attrs, callback) {
    // Here you can validate and sanitize 'attrs' before updating
    Land.update({ _id: id }, attrs, function (error, rawMessage) {
        if (error) {
            return handleError(error, callback);
        }
        console.log(rawMessage);
        callback(null, rawMessage);
    });
}

function remove(id, callback) {
    Land.remove({ _id: id }, function (error) {
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