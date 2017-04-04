var mongoose = require('mongoose');
var packageSchema = require('../schemas/package');

var Package = mongoose.model('Package', packageSchema);
var queryParams = packageSchema._queryParams;

function execQuery(query, callback) {
    query.select(queryParams.select)
        .populate(queryParams.populate)
        .exec(callback);
}

function _findRaw(attrs, callback) {
    Package.find(attrs || {}).exec(callback);
}

function _find(attrs, callback) {
    var query = Package.find(attrs || {});
    execQuery(query, callback);
}

function _findOne(attrs, callback) {
    var query = Package.findOne(attrs || {});
    execQuery(query, callback);
}

function _findByAttributes(attrs, callback) {
    _find(attrs, function (error, packs) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, packs);
    })
}

function findAll(callback) {
    _find({}, function (error, packs) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, packs);
    });
}

function findById(id, callback) {
    _findOne({ _id: id }, function (error, pack) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, pack);
    });
}

function findByCrop(name, callback) {
    _findByAttributes({ 'crop.name': name }, function (error, packs) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, packs);
    });
}

function create(attrs, callback) {
    // Here you can validate and sanitize 'attrs' before creating
    Package.create(attrs, function (error, pack) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, pack);
    });
}

function update(id, attrs, callback) {
    // Here you can validate and sanitize 'attrs' before updating
    Package.update({ _id: id }, attrs, function (error, rawMessage) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, rawMessage);
    });
}

function remove(id, callback) {
    Package.remove({ _id: id }, function (error) {
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
    findByCrop: findByCrop,
    create: create,
    update: update,
    remove: remove
};
