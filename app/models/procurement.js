var mongoose = require('mongoose');
var procurementSchema = require('../schemas/procurement');

var Procurement = mongoose.model('Procurement', procurementSchema);
var queryParams = procurementSchema._queryParams;

function execQuery(query, callback) {
    query.select(queryParams.select)
        .populate(queryParams.populate)
        .exec(callback);
}

function _findRaw(attrs, callback) {
    Procurement.find(attrs || {}).exec(callback);
}

function _find(attrs, callback) {
    var query = Procurement.find(attrs || {});
    execQuery(query, callback);
}

function _findOne(attrs, callback) {
    var query = Procurement.findOne(attrs || {});
    execQuery(query, callback);
}

function _findByAttributes(attrs, callback) {
    _find(attrs, function (error, procs) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, procs);
    })
}

function findAll(callback) {
    _find({}, function (error, procs) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, procs);
    });
}

function findById(id, callback) {
    _findOne({ _id: id }, function (error, procs) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, procs);
    });
}

function create(attrs, callback) {
    // Here you can validate and sanitize 'attrs' before creating
    Procurement.create(attrs, function (error, procs) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, procs);
    });
}

function update(id, attrs, callback) {
    // Here you can validate and sanitize 'attrs' before updating
    Procurement.update({ _id: id }, attrs, function (error, rawMessage) {
        if (error) {
            return handleError(error, callback);
        }
        console.log(rawMessage);
        callback(null, rawMessage);
    });
}

function remove(id, callback) {
    Procurement.remove({ _id: id }, function (error) {
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