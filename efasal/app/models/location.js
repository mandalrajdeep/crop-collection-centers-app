// load the things we need
var mongoose = require('mongoose');

// define the schema for location model
// this model is going to be used in several different models
var locationSchema = mongoose.Schema({

    name        : {type: String, trim: true},
    type        : {type: String, enum: ['Village', 'Town', 'City']},
    district    : {type: String, trim: true},
    state       : {type: String, default: 'Madhya Pradesh', enum: ['Delhi', 'Madhya Pradesh', 'Maharashtra', 'Karnataka']},
    country     : {type: String, default: 'India', enum: ['India', 'Bangaldesh']},
    pin         : {type: String, trim: true}

});


// methods ======================

// create the model for location and expose it to the app
module.exports = mongoose.model('Location', locationSchema);