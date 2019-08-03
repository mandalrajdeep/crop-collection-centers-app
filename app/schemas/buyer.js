// load the things we need
var mongoose = require('mongoose');

var BUYER_TYPES = ['trader', 'wholesaler', 'processor', 'exporter'];
var ADDRESS_TYPES = ['village', 'town', 'city'];
var STATES = ['Delhi', 'Madhya Pradesh', 'Maharashtra', 'Karnataka'];
var DEFAULT_STATE = 'Madhya Pradesh';
var COUNTRIES = ['India', 'Bangaldesh'];
var DEFAULT_COUNTRY = 'India';

var Schema = mongoose.Schema;

// define the schema for buyer model
var buyerSchema = mongoose.Schema({

    name        : {
            type: String, 
            trim: true,
            required: true
        },
    company     : {
            type: String, 
            trim: true
    },
    type        : {
            type: String, 
            required: true,
            enum: BUYER_TYPES
        },
    contact     : [{
            type: Schema.Types.ObjectId, 
            ref: 'Agent' 
        }],
    crop    : {type: Schema.Types.ObjectId, ref: 'Crop'},
    registrationDate    : {type: Date, require:true, default:Date.now},
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
var queryParams = {
    select: '_id name company type registrationDate destination',
    populate: 'contact crop'
};

// create the model for location and expose it to the app
buyerSchema._queryParams = queryParams;
module.exports = buyerSchema;