var mongoose = require('mongoose');
var deliverySchema = require('../schemas/delivery');

var Delivery = mongoose.model('Delivery', Delivery);
var queryParams = deliverySchema._queryParams;

function execQuery(query, callback) {
    query.select(queryParams.select)
        .populate(queryParams.populate)
        .exec(callback);
}

function _findRaw(attrs, callback) {
    Delivery.find(attrs || {}).exec(callback);
}

function _find(attrs, callback) {
    var query = Delivery.find(attrs || {});
    execQuery(query, callback);
}

function _findOne(attrs, callback) {
    var query = Delivery.findOne(attrs || {});
    execQuery(query, callback);
}

function _findByAttributes(attrs, callback) {
    _find(attrs, function (error, delivery) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, delivery);
    })
}

function findAll(callback) {
    _find({}, function (error, delivery) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, delivery);
    });
}

function findById(id, callback) {
    _findOne({ _id: id }, function (error, delivery) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, delivery);
    });
}

function create(attrs, callback) {
    // Here you can validate and sanitize 'attrs' before creating
    Delivery.create(attrs, function (error, delivery) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, delivery);
    });
}

function update(id, attrs, callback) {
    // Here you can validate and sanitize 'attrs' before updating
    Delivery.update({ _id: id }, attrs, function (error, rawMessage) {
        if (error) {
            return handleError(error, callback);
        }
        console.log(rawMessage);
        callback(null, rawMessage);
    });
}

function remove(id, callback) {
    Delivery.remove({ _id: id }, function (error) {
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