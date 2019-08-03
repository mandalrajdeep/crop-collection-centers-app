var mongoose = require('mongoose');
var CropSchema = require('../schemas/crop');

var Crop = mongoose.model('Crop', CropSchema);
var queryParams = CropSchema._queryParams;

function execQuery(query, callback) {
    query.select(queryParams.select)
        .populate(queryParams.populate)
        .exec(callback);
}

function _findRaw(attrs, callback) {
    Crop.find(attrs || {}).exec(callback);
}

function _find(attrs, callback) {
    var query = Crop.find(attrs || {});
    execQuery(query, callback);
}

function _findOne(attrs, callback) {
    var query = Crop.findOne(attrs || {});
    execQuery(query, callback);
}

function _findByAttributes(attrs, callback) {
    _find(attrs, function (error, crops) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, crops);
    })
}

function findAll(callback) {
    _find({}, function (error, crops) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, crops);
    });
}

function findById(id, callback) {
    _findOne({ _id: id }, function (error, crops) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, crops);
    });
}

function findByName(name, callback) {
    _findByAttributes({ name: new RegExp('^'+name+'$') }, function (error, crops) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, crops);
    });
}

function create(attrs, callback) {
    // Here you can validate and sanitize 'attrs' before creating
    Crop.create(attrs, function (error, crops) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, crops);
    });
}

function update(id, attrs, callback) {
    // Here you can validate and sanitize 'attrs' before updating
    Crop.update({ _id: id }, attrs, function (error, rawMessage) {
        if (error) {
            return handleError(error, callback);
        }
        console.log(rawMessage);
        callback(null, rawMessage);
    });
}

function remove(id, callback) {
    Crop.remove({ _id: id }, function (error) {
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