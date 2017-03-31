// load the things we need
var mongoose = require('mongoose');

// define the schema for crop model
var cropSchema = mongoose.Schema({
    name        : {type: String, required: true, trim: true},
    variety     : {type: String, required: true, trim: true},
    note        : {type: String, trim: true},
    parameters  : [{
        name   : {type: String, trim: true},
        unit    : {type: String, enum: ['percentage', 'centimeters', 'ratio']}
    }]
},
{
	timestamps: true
});

// indexing ======================

// methods ======================

// create the model for users and expose it to the app
module.exports = mongoose.model('Crop', cropSchema);