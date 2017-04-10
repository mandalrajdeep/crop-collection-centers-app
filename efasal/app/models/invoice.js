var mongoose = require('mongoose');
var invoiceSchema = require('../schemas/invoice');

var Invoice = mongoose.model('Invoice', invoiceSchema);
var queryParams = invoiceSchema._queryParams;

function execQuery(query, callback) {
    query.select(queryParams.select)
        .populate(queryParams.populate)
        .exec(callback);
}

function _findRaw(attrs, callback) {
    Invoice.find(attrs || {}).exec(callback);
}

function _find(attrs, callback) {
    var query = Invoice.find(attrs || {});
    execQuery(query, callback);
}

function _findOne(attrs, callback) {
    var query = Invoice.findOne(attrs || {});
    execQuery(query, callback);
}

function _findByAttributes(attrs, callback) {
    _find(attrs, function (error, invoice) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, invoice);
    })
}

function findAll(callback) {
    _find({}, function (error, invoice) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, invoice);
    });
}

function findById(id, callback) {
    _findOne({ _id: id }, function (error, invoice) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, invoice);
    });
}

function findByName(name, callback) {
    _findByAttributes({ 'farmer.name': name }, function (error, invoice) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, invoice);
    });
}

function create(attrs, callback) {
    // Here you can validate and sanitize 'attrs' before creating
    Invoice.create(attrs, function (error, invoice) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, invoice);
    });
}

function update(id, attrs, callback) {
    // Here you can validate and sanitize 'attrs' before updating
    Invoice.update({ _id: id }, attrs, function (error, rawMessage) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, rawMessage);
    });
}

function remove(id, callback) {
    Invoice.remove({ _id: id }, function (error) {
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
