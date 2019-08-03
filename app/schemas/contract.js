// load the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var STATUS = ['live', 'completed', 'approved', 'pending'];
var DEFAULT_STATUS = 'pending';
var ADDRESS_TYPES = ['village', 'town', 'city'];
var STATES = ['Delhi', 'Madhya Pradesh', 'Maharashtra', 'Karnataka'];
var DEFAULT_STATE = 'Madhya Pradesh';
var COUNTRIES = ['India', 'Bangaldesh'];
var DEFAULT_COUNTRY = 'India';
var PRICE_SETTERS = ['fixed','market'];
var PAYMENT_TYPE = ['after delivery', 'on delivery', 'advanced'];

// define the schema for contract model
var contractSchema = mongoose.Schema({

    name        : {type: String, required: true, trim: true},
    contractDate: {type: Date, required: true},
    buyer       : {type: Schema.Types.ObjectId, ref: 'Buyer', required: true},
    status      : {type: String, required: true, default: DEFAULT_STATUS, enum: STATUS},
    contractType: {
        crop    : {type: String, enum: PRICE_SETTERS},
        labour  : {type: String, enum: PRICE_SETTERS},
        freight : {type: String, enum: PRICE_SETTERS},
        sacks   : {type: String, enum: PRICE_SETTERS}
    },
    agent       : {type: Schema.Types.ObjectId, ref: 'Agent'},
    contact     : [{type: Schema.Types.ObjectId, ref: 'Agent' }],
    crop        : {type: Schema.Types.ObjectId, ref: 'Crop'},
    package     : {type: Schema.Types.ObjectId, ref: 'Package'},
    paymentType : {type: String, required: true, enum: PAYMENT_TYPE},
    quantity    : {type: Number, required: true, get: getNum, set: setNum},
    startDate   : {type: Date, required: true},
    endDate     : {type: Date, required: true},
    allocation  : [{
        CCD     : {type: Schema.Types.ObjectId, ref: 'CCD'},
        quantity: {type: Number, get: getNum, set: setNum},
        status  : {type: String, enum: STATUS}
    }]
},
{
	timestamps: true
});

function getNum(num){
    return (num/100).toFixed(2);
}

function setNum (num){
    return num*100;
}

var queryParams = {
    select: '_id name contractDate status contractType paymentType startDate endDate',
    populate: 'buyer agent contact crop package '
};

contractSchema._queryParams = queryParams;
module.exports = contractSchema;