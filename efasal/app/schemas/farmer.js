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

// define the schema for farmer model
var farmerSchema = mongoose.Schema({

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
    verified : {
            type: Boolean,
            default: false,
            required: true
    },
    aadhar      : {
            type: String, 
            trim: true,
            required: true
    },
    dateOfBirth   : {
            type: Date,
            required: true
    },
    phone         : [{
            label        : {type: String, default: WORK, enum: ['work', 'home', 'other']},
            value       : {type: String, trim: true}
    }],
    email 	: [{
            label: {type: String, default: WORK, enum: EMAIL_TYPE},
            value: {type: String, trim: true, lowercase: true}
    }],
    serviceProvider: {
            type: Schema.Types.ObjectId, 
            ref: 'ASP'
    },
    ccd         : {
            type: Schema.Types.ObjectId, 
            ref: 'CCD'
    },
    address : {
            name        : {type: String, required: true, trim: true},
            type        : {type: String, required: true, enum: ['village', 'town', 'city']},
            locality    : {type: String, trim: true},
            district    : {type: String, trim: true},
            state       : {type: String, required: true, default: 'Madhya Pradesh', enum: ['Delhi', 'Madhya Pradesh', 'Maharashtra', 'Karnataka']},
            country     : {type: String, required: true, default: 'India', enum: ['India', 'Bangaldesh']},
            pin         : {type: String, required: true, trim: true}
        },
    registrationDate    : {
        type: Date,
        required: true
    },
    landDetails : [{
            khasraNo    : {type: String, required: true, trim: true},
            area        : {type: Number, required: true, get: getArea, set: setArea },
            irrigationType: {type: String, required: true, enum: IRRIGATION_TYPE}
    }],
    bankDetails : [{
            passbookName: {type: String, required: true, trim: true},
            bankName: {type: String, required: true, enum: BANKS},
            bankAccountNo :{type: String, required: true, trim: true},
            ifsc        : {type: String, required: true, trim: true},
            kcc         : {type: String, trim: true},
            verified    : {type: Boolean,default: false, required: true},
            primaryAccount: {type: Boolean, default: false}
    }],
    crops       : [{
            season      : {type: String, enum: CROP_SEASON},
            crop        : {type: Schema.Types.ObjectId, ref: 'Crop'}
    }],
    allocation  : [{
            contract    : {type: Schema.Types.ObjectId, ref: 'Contract'},
            area        : {type: Number, required: true, get: getArea, set: setArea },
            quantity    : {type: Number, get: getNum, set: setNum},
            status      : {type: String, enum: STATUS}
    }]
},
{
	timestamps: true
});


// methods ======================
var queryParams = {
    select: '_id name parentName aadhar verified dateOfBirth serviceProvider phone email address registrationDate landDetails bankDetails crops ccd',
    populate: 'serviceProvider ccd crops.crop'
};

function getArea(num){
    return (num/100).toFixed(2);
}

function setArea (num){
    return num*100;
}
// create the model for location and expose it to the app
farmerSchema._queryParams = queryParams;
module.exports = farmerSchema;