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
            label        : {type: String, default: WORK, enum: PHONE_TYPE},
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
    address     : {
            name        : {type: String, required: true, trim: true},
            type        : {type: String, required: true, default: DEFAULT_ADDRESS, enum: ADDRESS_TYPES},
            locality    : {type: String, trim: true},
            district    : {type: String, trim: true},
            state       : {type: String, required: true, default: DEFAULT_STATE, enum: STATES},
            country     : {type: String, required: true, default: DEFAULT_COUNTRY, enum: COUNTRIES},
            pin         : {type: String, required: true, trim: true}
        },
    registrationDate    : {
        type: Date,
        required: true
    },
    landDetails : [{
            type: {type: Schema.Types.ObjectId, ref: 'Land'}
    }],
    bankDetails : [{
            passbookName: {type: String, required: true, trim: true},
            bankName: {type: String, required: true, enum: BANKS},
            bankAccountNo :{type: String, required: true, trim: true},
            ifsc        : {type: String, required: true, trim: true},
            kcc         : {type: String, trim: true},
            kccLimit    : {type: Number},
            verified    : {type: Boolean,default: false, required: true},
            primaryAccount: {type: Boolean, default: false}
    }],
    crops       : [{
            season      : {type: String, enum: CROP_SEASON},
            crop        : {type: Schema.Types.ObjectId, ref: 'Crop'}
    }],
    allocation  : [{
            contract    : {type: Schema.Types.ObjectId, ref: 'Contract'},
            serviceProvider: {type: Schema.Types.ObjectId, ref: 'ASP'},
            CCD         : {type: Schema.Types.ObjectId, ref: 'CCD'}, 
            khasraNo    : {type: Schema.Types.ObjectId, ref: 'Land'},
            areaPercent : {type: Number, required: true, get: getNum, set: setNum },
            quantity    : {type: Number, get: getNum, set: setNum},
            status      : {type: String, enum: STATUS}
    }],
},
{
	timestamps: true
});


// methods ======================
var queryParams = {
    select: '_id name parentName aadhar verified dateOfBirth phone email address registrationDate  bankDetails crops allocation',
    populate: 'serviceProvider ccd crops.crop allocation.khasraNo landDetails'
};

function getNum(num){
    return (num/100).toFixed(2);
}

function setNum (num){
    return num*100;
}
// create the model for location and expose it to the app
farmerSchema._queryParams = queryParams;
module.exports = farmerSchema;