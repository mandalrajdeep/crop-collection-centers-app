// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var randtoken = require('rand-token');

var Schema = mongoose.Schema;
// define the schema for user model

var ENTITIES = ['efasal', 'ccd', 'asp', 'farmer', 'buyer']
var USER_TYPES = ['admin', 'operations', 'sales', 'agents', 'marketing'];
var TOKEN_EXPIRY = 7 * 24 * 60 * 60;
var userSchema = mongoose.Schema({

local : {
        mobile     : {type: Number, required: true, trim: true, unique: true},
        password     : {type: String, required: true, trim: true},
    },
role : {
		entity: {type: String, required: true, enum: ENTITIES},
		group:	{type: String, required: true, enum: USER_TYPES}
	},
token : {
        type: Schema.Types.ObjectId,
        ref: 'Token',
        default: null
	}
},
{
	timestamps: true
});

var tokenSchema = mongoose.Schema({
	value: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	expireAt: {
		type: Date,
		expires: TOKEN_EXPIRY,
		default: Date.now
	}
});

// methods ======================

// this function generates the token, 
// then saves it with the user and saves the token
userSchema.methods.generateToken = function(){
	var token = new Token();
	token.value = randtoken.generate(32);
	token.user = this._id;
	this.token = token._id;
	this.save(function(err){
		if(err)
			throw err;
		token.save(function(err){
			if(err)
				throw err;
		});
	});
}

userSchema.methods.getRole = function(){
	console.log(this.role);
	return this.role;
}
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

// create the model for users and expose it to our app
var User = mongoose.model('User', userSchema);
var Token = mongoose.model('Token', tokenSchema);
var Models = { User: User, Token: Token };

module.exports = Models;