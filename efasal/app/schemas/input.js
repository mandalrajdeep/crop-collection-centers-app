// load the things we need
var mongoose = require('mongoose');

var INPUT_TYPE = ['pesticide', 'seed', 'other'];
// define the schema for crop model
var cropSchema = mongoose.Schema({
    name        : {type: String, required: true, trim: true},
    brand       : {type: String, trim: true},
    variety     : {type: String, required: true, trim: true},
    note        : {type: String, trim: true},
    parameters  : [{
        name    : {type: String, trim: true},
        unit    : {type: String, enum: PARAMETER_UNITS}
        }]
},
{
	timestamps: true
});

var queryParams = {
    select: '_id name variety note parameters',
    populate: ''
};

cropSchema._queryParams = queryParams;
module.exports = cropSchema;