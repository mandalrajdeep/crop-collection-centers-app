// load the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var STATUS = ['type 1', 'type 2'];

// define the schema for farmer model
var allocationSchema = mongoose.Schema({

    farmer      : {
            type: Schema.Types.ObjectId, 
            ref: 'CCD'
    },
    crop        : {
            type: Schema.Types.ObjectId, 
            ref: 'Crop'
    },
    contract    : {
            type: Schema.Types.ObjectId, 
            ref: 'Contract'
        },
    serviceProvider: {
            type: Schema.Types.ObjectId, 
            ref: 'ASP'
        },
    CCD         : {
            type: Schema.Types.ObjectId, 
            ref: 'CCD'
        }, 
    land        : {
            khasraNo    : {
                type: Schema.Types.ObjectId, 
                ref: 'Land'
            },
            areaPercent : {
                type: Number, 
                required: true, get: getNum, set: setNum }
    },
    quantity    : {
            type: Number, 
            get: getNum, 
            set: setNum},
    status      : {
            type: String, 
            enum: STATUS}
},
{
	timestamps: true
});


// methods ======================
var queryParams = {
    select: '_id quantity status',
    populate: 'farmer crop contract serviceProvider CCD land.khasraNo landDetails'
};

function getNum(num){
    return (num/100).toFixed(2);
}

function setNum (num){
    return num*100;
}
// create the model for location and expose it to the app
allocationSchema._queryParams = queryParams;
module.exports = allocationSchema;