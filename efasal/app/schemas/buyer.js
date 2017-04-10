// load the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// define the schema for buyer model
var buyerSchema = mongoose.Schema({

    name        : {
            type: String, 
            trim: true
        },
    company     : {
            type: String, 
            trim: true
    },
    type        : {
            type: String, 
            required: true,
            enum: ['trader', 'wholesaler', 'processor', 'exporter']
            },
    contact     : [{
            type: Schema.Types.ObjectId, 
            ref: 'Contact' 
        }],
    crop    : {type: Schema.Types.ObjectId, ref: 'Crop'},
    registrationDate    : {type: Date, require:true, default:Date.now},
    destination : {
            name        : {type: String, required: true, trim: true},
            type        : {type: String, required: true, enum: ['village', 'town', 'city']},
            locality    : {type: String, trim: true},
            district    : {type: String, trim: true},
            state       : {type: String, required: true, default: 'Madhya Pradesh', enum: ['Delhi', 'Madhya Pradesh', 'Maharashtra', 'Karnataka']},
            country     : {type: String, required: true, default: 'India', enum: ['India', 'Bangaldesh']},
            pin         : {type: String, required: true, trim: true}
            }
},
{
	timestamps: true
});


// methods ======================
var queryParams = {
    select: '_id name company type registrationDate destination',
    populate: 'contact crop'
};

// create the model for location and expose it to the app
buyerSchema._queryParams = queryParams;
module.exports = buyerSchema;