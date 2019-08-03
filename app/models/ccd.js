var mongoose = require('mongoose');
var ccdSchema = require('../schemas/ccd');

var CCD = mongoose.model('CCD', ccdSchema);
var queryParams = ccdSchema._queryParams;

function execQuery(query, callback) {
    query.select(queryParams.select)
        .populate(queryParams.populate)
        .exec(callback);
}

function _findRaw(attrs, callback) {
    CCD.find(attrs || {}).exec(callback);
}

function _find(attrs, callback) {
    var query = CCD.find(attrs || {});
    execQuery(query, callback);
}

function _findOne(attrs, callback) {
    var query = CCD.findOne(attrs || {});
    execQuery(query, callback);
}

function _findByAttributes(attrs, callback) {
    _find(attrs, function (error, ccds) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, ccds);
    })
}

function findAll(callback) {
    _find({}, function (error, ccds) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, ccds);
    });
}

function findById(id, callback) {
    _findOne({ _id: id }, function (error, ccds) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, ccds);
    });
}

function create(attrs, callback) {
    // Here you can validate and sanitize 'attrs' before creating
    CCD.create(attrs, function (error, ccds) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, ccds);
    });
}

function update(id, attrs, callback) {
    // Here you can validate and sanitize 'attrs' before updating
    CCD.update({ _id: id }, attrs, function (error, rawMessage) {
        if (error) {
            return handleError(error, callback);
        }
        console.log(rawMessage);
        callback(null, rawMessage);
    });
}

function remove(id, callback) {
    CCD.remove({ _id: id }, function (error) {
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