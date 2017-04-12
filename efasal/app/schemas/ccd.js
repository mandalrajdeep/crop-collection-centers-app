// load the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var STATUS = ['live', 'completed', 'approved', 'pending'];
var CATEGORY = ['type 1', 'type 2'];
var DEFAULT_ADDRESS = ['village'];
var ADDRESS_TYPES = ['village', 'town', 'city'];
var STATES = ['Delhi', 'Madhya Pradesh', 'Maharashtra', 'Karnataka'];
var DEFAULT_STATE = 'Madhya Pradesh';
var COUNTRIES = ['India', 'Bangaldesh'];
var DEFAULT_COUNTRY = 'India';

// define the schema for CCD model
var ccdSchema = mongoose.Schema({

    name        : {
            type: String, 
            trim: true,
            required: true
        },
    category    : {
            type: String,
            required: true,
            enum : CATEGORY
    },    
    address 	: {
            name        : {type: String, required: true, trim: true},
            type        : {type: String, required: true, enum: ADDRESS_TYPES},
            locality    : {type: String, trim: true},
            district    : {type: String, trim: true},
            state       : {type: String, required: true, default: DEFAULT_STATE, enum: STATES},
            country     : {type: String, required: true, default: DEFAULT_COUNTRY, enum: COUNTRIES},
            pin         : {type: String, required: true, trim: true}
        },
    contact     : [{
            type: Schema.Types.ObjectId, 
            ref: 'Agent' 
        }],
    registrationDate    : {
            type: Date,
            required: true
        },
    refMandi            : [{
            crop        : {type: Schema.Types.ObjectId, ref: 'Crop'},
            mandi       : {type: Schema.Types.ObjectId, ref: 'Mandi'}
    }],
    allocation  : [{
            contract    : {type: Schema.Types.ObjectId, ref: 'Contract'},
            serviceProvider     : {type: Schema.Types.ObjectId, ref: 'ASP'},
            quantity    : {type: Number, get: getNum, set: setNum},
            status      : {type: String, enum: STATUS}
    }]
},
{
	timestamps: true
});
// Derived variables
// - service providers 
// area - allocated, unallocated and total
// crops - crop, area, farmers


// methods ======================
function getNum(num){
    return (num/100).toFixed(2);
}

function setNum (num){
    return num*100;
}

// create the model for CCD and expose it to the app
var queryParams = {
    select: '_id name category address registrationDate',
    populate: 'contact refMandi'
};

ccdSchema._queryParams = queryParams;
module.exports = ccdSchema;