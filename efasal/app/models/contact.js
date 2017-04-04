var mongoose = require('mongoose');
var contactSchema = require('../schemas/contact');

var Contact = mongoose.model('Contact', contactSchema);
var queryParams = contactSchema._queryParams;

function execQuery(query, callback) {
    query.select(queryParams.select)
        .populate(queryParams.populate)
        .exec(callback);
}

function _findRaw(attrs, callback) {
    Contact.find(attrs || {}).exec(callback);
}

function _find(attrs, callback) {
    var query = Contact.find(attrs || {});
    execQuery(query, callback);
}

function _findOne(attrs, callback) {
    var query = Contact.findOne(attrs || {});
    execQuery(query, callback);
}

function _findByAttributes(attrs, callback) {
    _find(attrs, function (error, contacts) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, contacts);
    })
}

function findAll(callback) {
    _find({}, function (error, contacts) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, contacts);
    });
}

function findById(id, callback) {
    _findOne({ _id: id }, function (error, contact) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, contact);
    });
}

function findByName(name, callback) {
    _findByAttributes({ name: name }, function (error, contacts) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, contacts);
    });
}

function create(attrs, callback) {
    // Here you can validate and sanitize 'attrs' before creating
    Contact.create(attrs, function (error, contact) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, contact);
    });
}

function update(id, attrs, callback) {
    // Here you can validate and sanitize 'attrs' before updating
    Contact.update({ _id: id }, attrs, function (error, rawMessage) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, rawMessage);
    });
}

function remove(id, callback) {
    Contact.remove({ _id: id }, function (error) {
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
