var mongoose = require('mongoose');
var aspSchema = require('../schemas/asp');

var ASP = mongoose.model('ASP', aspSchema);
var queryParams = aspSchema._queryParams;

function execQuery(query, callback) {
    query.select(queryParams.select)
        .populate(queryParams.populate)
        .exec(callback);
}

function _findRaw(attrs, callback) {
    ASP.find(attrs || {}).exec(callback);
}

function _find(attrs, callback) {
    var query = ASP.find(attrs || {});
    execQuery(query, callback);
}

function _findOne(attrs, callback) {
    var query = ASP.findOne(attrs || {});
    execQuery(query, callback);
}

function _findByAttributes(attrs, callback) {
    _find(attrs, function (error, asps) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, asps);
    })
}

function findAll(callback) {
    _find({}, function (error, asps) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, asps);
    });
}

function findById(id, callback) {
    _findOne({ _id: id }, function (error, asps) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, asps);
    });
}

function findByName(name, callback) {
    _findByAttributes({ name: new RegExp('^'+name+'$', "i") }, function (error, asps) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, asps);
    });
}

function findByCCD(ccd, callback) {
    _findByAttributes({ ccd: ccd }, function (error, asps) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, asps);
    });
}

function findByArea(query, callback) {
    var searchParam = '';
    if (query.area !=null && query.area !='') {
        _findByAttributes({ 'address.name': query.area }, function (error, asps) {
            if (error) {
                return handleError(error, callback);
            }

            callback(null, asps);
        });
    } else if (query.pin != null && query.pin !=''){
        _findByAttributes({ 'address.pin': query.pin }, function (error, asps) {
            if (error) {
                return handleError(error, callback);
            }

            callback(null, asps);
        });
    } else if (query.district != null && query.district !=''){
        _findByAttributes({ 'address.district': query.district }, function (error, asps) {
            if (error) {
                return handleError(error, callback);
            }

            callback(null, asps);
        });
    } else {
            callback('Invalid query strings');
        }
}

function create(attrs, callback) {
    // Here you can validate and sanitize 'attrs' before creating
    // CCD should exist
    ASP.create(attrs, function (error, asps) {
        if (error) {
            return handleError(error, callback);
        }

        callback(null, asps);
    });
}

function update(id, attrs, callback) {
    // Here you can validate and sanitize 'attrs' before updating
    ASP.update({ _id: id }, attrs, function (error, rawMessage) {
        if (error) {
            return handleError(error, callback);
        }
        console.log(rawMessage);
        callback(null, rawMessage);
    });
}

function remove(id, callback) {
    ASP.remove({ _id: id }, function (error) {
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
    findByCCD: findByCCD,
    findByArea: findByArea,
    remove: remove
};