var mongoose = require('mongoose');
var farmerSchema = require('../schemas/farmer');

var Farmer = mongoose.model('Farmer', farmerSchema);
var queryParams = farmerSchema._queryParams;

function execQuery(query, callback) {
    query.select(queryParams.select)
        .populate(queryParams.populate)
        .exec(callback);
}

function _findRaw(attrs, callback) {
    Farmer.find(attrs || {}).exec(callback);
}

function _find(attrs, callback) {
    var query = Farmer.find(attrs || {});
    execQuery(query, callback);
}

function _findOne(attrs, callback) {
    var query = Farmer.findOne(attrs || {});
    execQuery(query, callback);
}

function _findByAttributes(attrs, callback) {
    _find(attrs, function (error, farmers) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, farmers);
    })
}

function findAll(callback) {
    _find({}, function (error, farmers) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, farmers);
    });
}

function findById(id, callback) {
    _findOne({ _id: id }, function (error, farmers) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, farmers);
    });
}

function findByName(name, callback) {
    _findByAttributes({ name: name }, function (error, farmers) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, farmers);
    });
}

function findByCCD(id, callback) {
    if (query.ccd !=null && query.ccd !='') {
        _findByAttributes({ 'ccd': query.ccd }, function (error, asps) {
            if (error) {
                return handleError(error, callback);
            }

            callback(null, asps);
        });
    } else if (query.asp != null && query.asp !=''){
        _findByAttributes({ 'asp': query.asp }, function (error, asps) {
            if (error) {
                return handleError(error, callback);
            }

            callback(null, asps);
        });
    } else {
        callback('Invalid query strings');
        }
}

function findByArea(query, callback) {
    if (query.area !=null && query.area !='') {
        _findByAttributes({ 'address.name': query.area }, function (error, farmers) {
            if (error) {
                return handleError(error, callback);
            }

            callback(null, farmers);
        });
    } else if (query.district != null && query.district !=''){
        _findByAttributes({ 'address.district': query.district }, function (error, farmers) {
            if (error) {
                return handleError(error, callback);
            }

            callback(null, farmers);
        });
    } else if (query.pin != null && query.pin !=''){
        _findByAttributes({ 'address.pin': query.pin }, function (error, farmers) {
            if (error) {
                return handleError(error, callback);
            }

            callback(null, farmers);
        });
    } else {
        callback('Invalid query strings');
        }
}

function create(attrs, callback) {
    // Here you can validate and sanitize 'attrs' before creating
    Farmer.create(attrs, function (error, farmers) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, farmers);
    });
}

function update(id, attrs, callback) {
    // Here you can validate and sanitize 'attrs' before updating
    Farmer.update({ _id: id }, attrs, function (error, rawMessage) {
        if (error) {
            return handleError(error, callback);
        }
        console.log(rawMessage);
        callback(null, rawMessage);
    });
}

function remove(id, callback) {
    Farmer.remove({ _id: id }, function (error) {
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
    findByName: findByName,
    findByArea: findByArea,
    findByCCD: findByCCD,
    remove: remove
};