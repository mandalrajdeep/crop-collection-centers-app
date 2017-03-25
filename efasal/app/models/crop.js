// load the things we need
var mongoose = require('mongoose');

// define the schema for quality parameter model
var paramSchema = mongoose.Schema({

    name        : {type: String, trim: true},
    unit        : {type: String, enum: ['Percentage', 'Centimeters', 'Ratio']}

});

// define the schema for crop model
var cropSchema = mongoose.Schema({

    name        : {type: String, required: true, trim: true},
    variety     : {type: String, required: true, trim: true},
    note        : {type: String, trim: true},
    parameters  : [paramSchema]

});

// methods ======================


// create the model for users and expose it to the app
var Crop = mongoose.model('Crop', cropSchema);
var Param = mongoose.model('Parameter', paramSchema);
var Models = { Crop: Crop, Param: Param };

module.exports = Models;