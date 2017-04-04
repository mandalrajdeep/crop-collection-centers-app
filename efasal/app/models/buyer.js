var mongoose = require('mongoose');
var buyerSchema = require('../schemas/buyer');

var Buyer = mongoose.model('Buyer', buyerSchema);
var queryParams = buyerSchema._queryParams;

function execQuery(query, callback) {
    query.select(queryParams.select)
        .populate(queryParams.populate)
        .exec(callback);
}

function _findRaw(attrs, callback) {
    Buyer.find(attrs || {}).exec(callback);
}

function _find(attrs, callback) {
    var query = Buyer.find(attrs || {});
    execQuery(query, callback);
}

function _findOne(attrs, callback) {
    var query = Buyer.findOne(attrs || {});
    execQuery(query, callback);
}

function _findByAttributes(attrs, callback) {
    _find(attrs, function (error, buyers) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, buyers);
    })
}

function findAll(callback) {
    _find({}, function (error, buyers) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, buyers);
    });
}

function findById(id, callback) {
    _findOne({ _id: id }, function (error, buyers) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, buyers);
    });
}

function create(attrs, callback) {
    // Here you can validate and sanitize 'attrs' before creating
    Buyer.create(attrs, function (error, buyers) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, buyers);
    });
}

function update(id, attrs, callback) {
    // Here you can validate and sanitize 'attrs' before updating
    Buyer.update({ _id: id }, attrs, function (error, rawMessage) {
        if (error) {
            return handleError(error, callback);
        }
        callback(null, rawMessage);
    });
}

function remove(id, callback) {
    Buyer.remove({ _id: id }, function (error) {
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