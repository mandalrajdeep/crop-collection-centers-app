// load the things we need
var mongoose = require('mongoose');

var PARAMETER_UNITS = ['percentage', 'centimeters', 'ratio'];
var PAYMENT_STATUS = ['pending', 'approved', 'completed'];
var TRANSFER_STATUS = ['warehouse', 'in-transit', 'delivered'];
var Schema = mongoose.Schema;

// define the schema for CCD model
var procurementSchema = mongoose.Schema({
    CCD             : {type: Schema.Types.ObjectId, ref: 'CCD'},
    farmer          : {type: Schema.Types.ObjectId, ref: 'Farmer'},
    serviceProvider : {type: Schema.Types.ObjectId, ref: 'Alloc'},
    allocation      : {type: Schema.Types.ObjectId, ref: 'ASP'},
    contract        : {type: Schema.Types.ObjectId, ref: 'Contract'},
    crop            : {type: Schema.Types.ObjectId, ref: 'Crop'},
    quantity        : {type: Number, required: true, get: getNum, set: setNum},
    qualityParams   : [{
        name    : {type: String, trim: true},
        unit    : {type: String, enum: PARAMETER_UNITS},
        value   : {type: String}
    }],
    packageUnits    : {type: Number, required: true},
    package         : {type: Schema.Types.ObjectId, ref: 'Contract'},
    paymentStatus   : {type: String, enum: PAYMENT_STATUS},
    transferStatus  : {type: String, enum: TRANSFER_STATUS}
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
    select: '_id quantity qualityParams packageUnits paymentStatus transferStatus',
    populate: 'CCD farmer allocation serviceProvider contract crop package farmerInvoice factoryInvoice'
};

procurementSchema._queryParams = queryParams;
module.exports = procurementSchema;