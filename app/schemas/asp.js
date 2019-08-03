// load the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PHONE_TYPE = ['work', 'home', 'other'];
var EMAIL_TYPE = ['work', 'personal', 'other'];
var DEFAULT_ADDRESS = ['village'];
var ADDRESS_TYPES = ['village', 'town', 'city'];
var STATES = ['Delhi', 'Madhya Pradesh', 'Maharashtra', 'Karnataka'];
var DEFAULT_STATE = 'Madhya Pradesh';
var COUNTRIES = ['India', 'Bangaldesh'];
var DEFAULT_COUNTRY = 'India';
var STATUS = ['live', 'completed', 'approved', 'pending'];

// define the schema for farmer model
var aspSchema = mongoose.Schema({
    name        : {
            type: String, 
            trim: true,
            required: true
            },
    parentName : {
            type: String, 
            trim: true,
            required: true
        },
    aadhar      : {
            type: String, 
            trim: true,
            required: true
    },
    verified : {
            type: Boolean,
            default: false,
            required: true
    },
    dateOfBirth   : {
            type: Date,
            required: true
    },
    ccd         : {
            type: Schema.Types.ObjectId, 
            required: true,
            ref: 'CCD'
    },
    phone 	: [{
            label: {type: String, enum: PHONE_TYPE},
            value: {type: String, trim: true}
    }],
    email 	: [{
            label: {type: String, enum: EMAIL_TYPE},
            value: {type: String, trim: true, lowercase: true}
    }],
    address     : {
            name        : {type: String, required: true, trim: true},
            type        : {type: String, required: true, default: DEFAULT_ADDRESS, enum: ADDRESS_TYPES},
            locality    : {type: String, trim: true},
            district    : {type: String, trim: true},
            state       : {type: String, required: true, default: DEFAULT_STATE, enum: STATES},
            country     : {type: String, required: true, default: DEFAULT_COUNTRY, enum: COUNTRIES},
            pin         : {type: String, required: true, trim: true}
        },
    registrationDate: {
        type: Date,
        required: true
    },
    allocation  : [{
            contract    : {type: Schema.Types.ObjectId, ref: 'Contract'},
            CCD         : {type: Schema.Types.ObjectId, ref: 'CCD'},
            farmer      : {type: Schema.Types.ObjectId, ref: 'Farmer'},
            quantity    : {type: Number, get: getNum, set: setNum},
            status      : {type: String, enum: STATUS}
    }]
},
{
	timestamps: true
});


// methods ======================
function getNum(num){
    return (num/100).toFixed(2);
}

function setNum (num){
    return num*100;
}

var queryParams = {
    select: '_id name parentName aadhar verified dateOfBirth phone email address registrationDate',
    populate: 'ccd'
};
// create the model for location and expose it to the app
aspSchema._queryParams = queryParams;
module.exports = aspSchema;