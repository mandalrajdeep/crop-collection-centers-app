module.exports = function(router, passport){
	//localhost:8080/auth/
	router.get('/', function(req, res){
		res.render('auth/index.ejs');
	});
	
	//localhost:8080/auth/login
	router.get('/login', function(req, res){
		res.render('auth/login.ejs', { message: req.flash('loginMessage') });
	});

	router.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	//localhost:8080/auth/signup
	router.get('/signup', function(req, res){
		res.render('auth/signup.ejs', { message: req.flash('signupMessage') });
	});

	router.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	})
};
