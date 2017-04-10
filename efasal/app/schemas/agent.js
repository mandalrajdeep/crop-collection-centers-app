// load the things we need
var mongoose = require('mongoose');

var PHONE_TYPE = ['work', 'home', 'other'];
var EMAIL_TYPE = ['work', 'personal', 'other'];
var ADDRESS_TYPES = ['village', 'town', 'city'];
var STATES = ['Delhi', 'Madhya Pradesh', 'Maharashtra', 'Karnataka'];
var DEFAULT_STATE = 'Madhya Pradesh';
var COUNTRIES = ['India', 'Bangaldesh'];
var DEFAULT_COUNTRY = 'India';
var AGENT_TYPE = ['buyer', 'supply', 'logistics'];

// define the schema for contact model
var agentSchema = mongoose.Schema({

    name        : {type: String, trim: true},
    work        : {
    	job_title		: {type: String, trim: true},
    	organization	: {type: String, trim: true}
    			},
    phone 		: [{
            label        : {type: String, enum: PHONE_TYPE},
            value       : {type: String, trim: true}

    }],
    type        : {type: String, enum: AGENT_TYPE},
    email 		: [{
            label       : {type: String, enum: EMAIL_TYPE},
            value       : {type: String, trim: true, lowercase: true}
    }],
    address 	: {
            name        : {type: String, required: true, trim: true},
            type        : {type: String, required: true, enum: ADDRESS_TYPES},
            locality    : {type: String, trim: true},
            district    : {type: String, trim: true},
            state       : {type: String, required: true, default: DEFAULT_STATE, enum: STATES},
            country     : {type: String, required: true, default: DEFAULT_COUNTRY, enum: COUNTRIES},
            pin         : {type: String, required: true, trim: true}
            } 
},
{
	timestamps: true
});


// methods ======================

// create the model for location and expose it to the app
var queryParams = {
    select: '_id name work phone email address',
    populate: ''
};

agentSchema._queryParams = queryParams;
module.exports = agentSchema;