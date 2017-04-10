// load the things we need
var mongoose = require('mongoose');

var PAYMENT_STATUS = ['pending', 'approved', 'completed'];
var DEFAULT_STATUS = 'completed';

// define the schema for crop model
var invoiceSchema = mongoose.Schema({
    date      : {type: Date, required: true},
    CCD       : {type: Schema.Types.ObjectId, ref: 'CCD'},
    ASP       : {type: Schema.Types.ObjectId, ref: 'ASP'},
    farmer    : {type: Schema.Types.ObjectId, ref: 'Farmer'},
    procs     : [{
        procurement : {type: Schema.Types.ObjectId, ref: 'Procurement'},
        crop        : {type: Schema.Types.ObjectId, ref: 'Crop'},
        quantity    : {type: Number, required: true, get: getNum, set: setNum},
        rate        : {type: Number, get: getPrice, set: setPrice}
    }],
    packs     : [{
        procurement : {type: Schema.Types.ObjectId, ref: 'Package'},
        quantity    : {type: Number, required: true, get: getNum, set: setNum},
        rate        : {type: Number, get: getPrice, set: setPrice}
    }],
    status    : {type: String, required: true, default: DEFAULT_STATUS, enum: PAYMENT_STATUS}
},
{
	timestamps: true
});

var queryParams = {
    select: '_id date status procs packs',
    populate: 'CCD ASP farmer'
};

invoiceSchema._queryParams = queryParams;
module.exports = invoiceSchema;