// eFasal Application

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
// var cors = require('cors');
var mongoStore = require('connect-mongo')(session);

var configDB = require('./config/database.js');

//autoIndex to False in Production
mongoose.connect(configDB.url, { config: { autoIndex: true } });
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true,
				 store: new mongoStore({ mongooseConnection: mongoose.connection,
				 							ttl: 2 * 24 * 60 * 60  //time to live
})}));

app.use(passport.initialize());
app.use(passport.session()); //passport uses the same session
app.use(flash());

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', './public/views');
// app.engine('html', require('ejs').renderFile); //for rendering html files


var auth = express.Router();
require('./app/routes/auth.js')(auth, passport);
app.use('/auth', auth);

var api = express.Router();
require('./app/routes/api.js')(api, passport);
app.use('/api', api);

// var crop = express.Router();
// require('./app/routes/crop.js')(crop, passport);
// app.use('/crop', crop);

// var contact = express.Router();
// require('./app/routes/contact.js')(contact, passport);
// app.use('/contact', contact);

// var mandi = express.Router();
// require('./app/routes/mandi.js')(mandi, passport);
// app.use('/mandi', mandi);

var secure = express.Router();
require('./app/routes/secure.js')(secure, passport);
app.use('/', secure);

app.listen(port);
console.log('Server running on port: ' + port);



