// load the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PHONE_TYPE = ['work', 'home', 'other'];
var EMAIL_TYPE = ['work', 'personal', 'other'];
var WORK = 'work';
var DEFAULT_ADDRESS = ['village'];
var ADDRESS_TYPES = ['village', 'town', 'city'];
var STATES = ['Delhi', 'Madhya Pradesh', 'Maharashtra', 'Karnataka'];
var DEFAULT_STATE = 'Madhya Pradesh';
var COUNTRIES = ['India', 'Bangaldesh'];
var DEFAULT_COUNTRY = 'India';
var IRRIGATION_TYPE = ['Open Well', 'Canal', 'Tubewell', 'Tank', 'None'];
var BANKS = ['State Bank of India', 'ICICI Bank'];
var CROP_SEASON = ['Rabi', 'Kharif', 'Zayed'];
var STATUS = ['type 1', 'type 2'];

// define the schema for farmer model
var landSchema = mongoose.Schema({

    farmer: {
            type: Schema.Types.ObjectId, 
            ref: 'Farmer'
    },
    khasraNo    : {type: String, required: true, trim: true},
    area        : {type: Number, required: true, get: getNum, set: getNum },
    irrigationType: {type: String, required: true, enum: IRRIGATION_TYPE},

    coordinates : {
        latitude: {type: String},
        longitude: {type: String}
    }
},
{
	timestamps: true
});


// methods ======================
var queryParams = {
    select: '_id  khasraNo area irrigationType coordinates',
    populate: 'farmer'
};

// create the model for location and expose it to the app
landSchema._queryParams = queryParams;
module.exports = landSchema;