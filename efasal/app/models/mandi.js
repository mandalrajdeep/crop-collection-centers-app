// load the things we need
var mongoose = require('mongoose');

var Contact = require('../models/contact');
var Crop = require('../models/crop');
var Schema = mongoose.Schema;

// define the schema for mandi model
var mandiSchema = mongoose.Schema({

    name        : {type: String, trim: true},
    contact     : {type: Schema.Types.ObjectId, ref: 'Contact' },
    crop        : [{ type: Schema.Types.ObjectId, ref: 'Crop'}, {
          price : { type: Number, get: getPrice, set: setPrice } // database unit is paise
    }],
    address 	: { 
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
mandiSchema.methods.addContact = function(contact_id){
	Contact.findById(contact_id, function (err, val){
                if (err)
                    res.send(err);;
                this.contact = val;
            });
}

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice (num){
    return num*100;
}
// create the model for Mandi and expose it to the app
module.exports = mongoose.model('Mandi', mandiSchema);