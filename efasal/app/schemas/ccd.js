// load the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var STATUS = ['live', 'completed', 'approved', 'pending'];
var CATEGORY = ['type 1', 'type 2'];

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
    address     : [{
            name        : {type: String, required: true, trim: true},
            type        : {type: String, required: true, enum: ['village', 'town', 'city']},
            locality    : {type: String, trim: true},
            district    : {type: String, trim: true},
            state       : {type: String, required: true, default: 'Madhya Pradesh', enum: ['Delhi', 'Madhya Pradesh', 'Maharashtra', 'Karnataka']},
            country     : {type: String, required: true, default: 'India', enum: ['India', 'Bangaldesh']},
            pin         : {type: String, required: true, trim: true}
        }],
    registrationDate    : {
            type: Date,
            required: true
        },
    refMandi            : {
            crop        : {type: Schema.Types.ObjectId, ref: 'Crop'},
            mandi       : {type: Schema.Types.ObjectId, ref: 'Mandi'}
    },
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
    populate: ''
};

ccdSchema._queryParams = queryParams;
module.exports = ccdSchema;