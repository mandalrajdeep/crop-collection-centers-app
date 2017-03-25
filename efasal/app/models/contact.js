// load the things we need
var mongoose = require('mongoose');

// define the schema for phone numbers model
var phoneSchema = mongoose.Schema({

    type        : {type: String, enum: ['Work', 'Home', 'Other']},
    value       : {type: String, trim: true}

});

// define the schema for emails model
var emailSchema = mongoose.Schema({

    type        : {type: String, enum: ['Work', 'Personal', 'Other']},
    value       : {type: String, trim: true, lowercase: true}

});

// define the schema for location model
var contactSchema = mongoose.Schema({

    name        : {type: String, trim: true},
    work        : {
    	job_title		: {type: String, trim: true},
    	organization	: {type: String, trim: true}
    			},
    phone 		: [phoneSchema],
    email 		: [emailSchema],
    address 	: {locationSchema} 
});


// methods ======================

// create the model for location and expose it to the app
module.exports = mongoose.model('Location', locationSchema);