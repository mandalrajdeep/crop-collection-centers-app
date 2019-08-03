// load the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ADDRESS_TYPES = ['village', 'town', 'city'];
var STATES = ['Delhi', 'Madhya Pradesh', 'Maharashtra', 'Karnataka'];
var DEFAULT_STATE = 'Madhya Pradesh';
var COUNTRIES = ['India', 'Bangaldesh'];
var DEFAULT_COUNTRY = 'India';

// define the schema for mandi model
var mandiSchema = mongoose.Schema({

    name        : {type: String, required: true, trim: true},
    contact     : [{type: Schema.Types.ObjectId, ref: 'Agent' }],
    crop        : [{ type: Schema.Types.ObjectId, ref: 'Crop'
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

var queryParams = {
    select: '_id name address',
    populate: 'contact crop'
};

mandiSchema._queryParams = queryParams;
module.exports = mandiSchema;
