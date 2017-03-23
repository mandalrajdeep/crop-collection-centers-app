// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for user model
var userSchema = mongoose.Schema({

    local            : {
        email        : {type: String, required: true, trim: true, unique: true},
        password     : {type: String, required: true, trim: true},
        access       : {type: String, default: 'admin', enum: ['Admin', 'eFasal', 'Buyer', 'Farmer', 'ASP', 'CCD', 'Agent', 'Visitor']}
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        access       : {type: String, default: 'admin', enum: ['Admin', 'eFasal', 'Buyer', 'Farmer', 'ASP', 'CCD', 'Agent', 'Visitor']}
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String,
        access       : {type: String, default: 'admin', enum: ['Admin', 'eFasal', 'Buyer', 'Farmer', 'ASP', 'CCD', 'Agent', 'Visitor']}
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        access       : {type: String, default: 'admin', enum: ['Admin', 'eFasal', 'Buyer', 'Farmer', 'ASP', 'CCD', 'Agent', 'Visitor']}
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);