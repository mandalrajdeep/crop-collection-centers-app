var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
//var JwtStrategy = require ('passport-jwt').Strategy;
//var ExtractJwt = require('passport-jwt').ExtractJwt;
//var config = require('./auth');

var User             = require('../app/models/user').User;
var Token            = require('../app/models/user').Token;

module.exports = function(passport) {

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		console.log(req.body);
		process.nextTick(function(){
			User.findOne({'local.username': email}, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage', 'That email already taken'));
				} else {
					var newUser = new User();
					newUser.local.username = email;
					newUser.local.password = newUser.generateHash(password);
					newUser.local.role = req.body.role;

					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser);
					})
				}
			})

		});
	}));

	passport.use('local-login', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, email, password, done){
			process.nextTick(function(){
				User.findOne({ 'local.username': email}, function(err, user){
					if(err)
						return done(err);
					if(!user)
						return done(null, false, req.flash('loginMessage', 'No User found'));
					if(!user.validPassword(password)){
						return done(null, false, req.flash('loginMessage', 'Inavalid password'));
					}
					return done(null, user);

				});
			});
		}
	));

	passport.use(new BearerStrategy({},
		function(token, done){
			Token.findOne({value: token}).populate('user').exec(function(err, token){
				if(!token)
					return done(null, false);
				return done(null, token.user);
			})
	}));


	// var jwtLogin = new JwtStrategy({
	// 	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	// 	secretOrKey: config.secret
	// }, function(payload, done){
	// 		User.findById (payload._id, function(err, user){
	// 		if(err){
	// 			return done(err, false);
	// 		}
	// 		if(user){
	// 			done(null, user);
	// 		} else {
	// 			done(null, false);
	// 		}
	// 	});
	// });

};