// load the things we need
var mongoose = require('mongoose');

var PACKING_BASE = ['gunny bag', 'porous packing material', 'crate']
var Schema = mongoose.Schema;

// define the schema for CCD model
var packageSchema = mongoose.Schema({

    name        : {
            type: String, 
            trim: true,
            required: true
        },
    labels      : { 
            label   : {type: String, trim: true, required: true},
            material: {type: String, trim: true},
            price   : {type: Number, get: getNum, set: setNum }
    },
    instructions: {
            type: String, 
            trim: true,
    },
    base        : {type: String, required:true, enum: PACKING_BASE},
    seeds       : {type: Boolean, default: false},
    crop        : {type: Schema.Types.ObjectId, ref: 'Crop'},
    props       : {
            brand   : {type: String, trim: true},
            capacity: {type: Number, required: true, get: getNum, set: setNum},
            weight  : {type: Number, get: getNum, set: setNum},
            material: {type: String, trim: true},
            price   : {type: Number, get: getNum, set: setNum },
            reusable: {type: Boolean, default: false}
    },
    threads     : {
            brand   : {type: String, trim: true},
            length  : {type: Number, get: getNum, set: setNum},
            weight  : {type: Number, get: getNum, set: setNum},
            material: {type: String, trim: true},
            price   : {type: Number, get: getNum, set: setNum },
            reusable: {type: Boolean }
    },
    fillers     : {
            brand   : {type: String, trim: true},
            quantity: {type: Number, get: getNum, set: setNum},
            weight  : {type: Number, get: getNum, set: setNum},
            material: {type: String, trim: true},
            price   : {type: Number, get: getNum, set: setNum },
            reusable: {type: Boolean}
    },
    seals       : {
            brand   : {type: String, trim: true},
            quantity: {type: Number, get: getNum, set: setNum},
            weight  : {type: Number, get: getNum, set: setNum},
            material: {type: String, trim: true},
            price   : {type: Number, get: getNum, set: setNum },
            reusable: {type: Boolean}
    }
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
    select: '_id name labels instructions base seeds crop props threads fillers seals',
    populate: 'crop'
};

packageSchema._queryParams = queryParams;
module.exports = packageSchema;