var mongoose = require('mongoose');
var allocSchema = require('../schemas/allocation');

var Alloc = mongoose.model('Alloc', allocSchema);
var queryParams = allocSchema._queryParams;

function execQuery(query, callback) {
    query.select(queryParams.select)
        .populate(queryParams.populate)
        .exec(callback);
}

function _findRaw(attrs, callback) {
    Alloc.find(attrs || {}).exec(callback);
}

function _find(attrs, callback) {
    var query = Alloc.find(attrs || {});
    execQuery(query, callback);
}

function _findOne(attrs, callback) {
    var query = Alloc.findOne(attrs || {});
    execQuery(query, callback);
}

function _findByAttributes(attrs, callback) {
    _find(attrs, function (error, allocs) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, allocs);
    })
}

function findAll(callback) {
    _find({}, function (error, allocs) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, allocs);
    });
}

function findById(id, callback) {
    _findOne({ _id: id }, function (error, allocs) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, allocs);
    });
}

function findByFarmer(id, callback) {
    _findByAttributes({ farmer: id }, function (error, allocs) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, allocs);
    });
}

function create(attrs, callback) {
    // Here you can validate and sanitize 'attrs' before creating
    Alloc.create(attrs, function (error, allocs) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, allocs);
    });
}

function update(id, attrs, callback) {
    // Here you can validate and sanitize 'attrs' before updating
    Alloc.update({ _id: id }, attrs, function (error, rawMessage) {
        if (error) {
            return handleError(error, callback);
        }
        console.log(rawMessage);
        callback(null, rawMessage);
    });
}

function remove(id, callback) {
    Alloc.remove({ _id: id }, function (error) {
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