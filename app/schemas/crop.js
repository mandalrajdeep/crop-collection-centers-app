// load the things we need
var mongoose = require('mongoose');

var PARAMETER_UNITS = ['percentage', 'centimeters', 'ratio'];
// define the schema for crop model
var cropSchema = mongoose.Schema({
    name        : {type: String, required: true, trim: true},
    variety     : {type: String, required: true, trim: true},
    description : {type: String, trim: true},
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