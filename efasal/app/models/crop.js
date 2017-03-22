// load the things we need
var mongoose = require('mongoose');

// define the schema for quality parameter model
var parameterSchema = mongoose.Schema({

    name        : {type: String, trim: true}
    unit        : {type: String, enum: ['Percentage', 'Centimeters', 'Ratio']}

});

// define the schema for crop model
var cropSchema = mongoose.Schema({

    name        : {type: String, required: true, trim: true},
    variety     : {type: String, required: true. trim: true},
    note        : {type: String, trim: true},
    parameters  : [parameterSchema]

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

// create the model for users and expose it to the app
module.exports = mongoose.model('Crop', cropSchema);
module.exports = mongoose.model('Parameters', parameterSchema);