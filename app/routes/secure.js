var User = require('../schemas/user').User;
var Token = require('../schemas/user').Token;

module.exports = function(router, passport){

	router.use(function(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		res.redirect('/auth');

	});

	router.get('/profile', function(req, res){
		User.findOne({ _id: req.user._id }).populate('token').exec(function(err, user){
			res.render('profile.ejs', { user: user });
		});
	});

	router.get('/home', function(req, res){
		res.render('home.ejs');
	});

	router.get('/getToken', function(req, res){
		User.findOne({ _id: req.user._id }).populate('token').exec(function(err, user){
			if(user.token == null) {
				user.generateToken();
			}
			req.user = user;
			res.status(400).redirect('/profile');
			//res.redirect('/profile', function(err){
			//	console.log(err);
			//});
		});
	});

	router.get('/*', function(req, res){
		console.log('Danger');
		res.render('index.ejs');
	})

};