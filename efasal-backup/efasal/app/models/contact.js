// load the things we need
var mongoose = require('mongoose');

// define the schema for location model
var contactSchema = mongoose.Schema({

    name        : {type: String, trim: true},
    work        : {
    	job_title		: {type: String, trim: true},
    	organization	: {type: String, trim: true}
    			},
    phone 		: [{
            label        : {type: String, enum: ['work', 'home', 'other']},
            value       : {type: String, trim: true}

    }],
    email 		: [{
            label       : {type: String, enum: ['work', 'personal', 'other']},
            value       : {type: String, trim: true, lowercase: true}
    }],
    address 	: {
            name        : {type: String, required: true, trim: true},
            type        : {type: String, required: true, enum: ['village', 'town', 'city']},
            locality    : {type: String, trim: true},
            district    : {type: String, trim: true},
            state       : {type: String, required: true, default: 'Madhya Pradesh', enum: ['Delhi', 'Madhya Pradesh', 'Maharashtra', 'Karnataka']},
            country     : {type: String, required: true, default: 'India', enum: ['India', 'Bangaldesh']},
            pin         : {type: String, required: true, trim: true}
            } 
},
{
	timestamps: true
});


// methods ======================

// create the model for location and expose it to the app
module.exports = mongoose.model('Contact', contactSchema);