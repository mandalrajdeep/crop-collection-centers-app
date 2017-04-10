// load the things we need
var mongoose = require('mongoose');

var CARRIER_TYPE = ['type 1', 'type 2', 'type 3'];
var DELIVERY_STATUS = ['dispatched', 'delivered'];
var DEFAULT_STATUS = 'dispatched';
var Schema = mongoose.Schema;

// define the schema for CCD model
var deliverySchema = mongoose.Schema({
    dispatchDate    : {type: Date, required: true, default: Date.now()},
    deliveryDate    : {type: Date, required: true},
    CCD             : {type: Schema.Types.ObjectId, ref: 'CCD'},
    buyer           : {type: Schema.Types.ObjectId, ref: 'Buyer'},
    procs           : [{type: Schema.Types.ObjectId, ref: 'Procurement'}],
    logistics       : {
            provider      : {type: String, required: true, trim: true},
            carrier       : {type: String, enum: CARRIER_TYPE},
            model         : {type: String, trim: true},
            capacity      : {type: Number, required: true, get: getNum, set: setNum},
            vehicleNo     : {type: String, trim: true},
            contact       : {type: String, required: true, trim: true}
    },
    status          : {type: Number, required: true, default: DEFAULT_STATUS, enum: DELIVERY_STATUS}        
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
    populate: 'CCD farmer serviceProvider contract crop package farmerInvoice factoryInvoice'
};

deliverySchema._queryParams = queryParams;
module.exports = deliverySchema;