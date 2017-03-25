// load the things we need
var mongoose = require('mongoose');

// define the schema for mandi model
var mandiSchema = mongoose.Schema({

    name        : {type: String, trim: true},
    location    : {locationSchema},
    crop        : [cropSchema],
    contact     : [contactSchema]

});


// methods ======================

// create the model for location and expose it to the app
module.exports = mongoose.model('Location', locationSchema);