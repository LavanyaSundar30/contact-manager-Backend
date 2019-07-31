const express = require("express");
const server = express();
const config = require('./config/config');
const  contactRouter=require('./router/contact');
const  adminRouter=require('./router/admin');
const  uploadRouter=require('./router/upload');
const middleware = require('./middleware/middleware');
const bodyParser = require('body-parser');
var cors = require('cors');
// var path = require('path');
let multer       = require('multer');
global.upload    = multer({dest: 'uploads/'});
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// server.set('view engine', 'jade');

server.use('/uploads', express.static('uploads'));

server.set('view engine', 'pug')


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(middleware);
server.use("/contact", contactRouter);
server.use("/admin", adminRouter);
server.use("/upload", uploadRouter);
// var profile = require('./router/profile');

var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
  };

  server.use(cors(corsOptions));
server.use(cors({origin: 'http://localhost:4200'}));


server.listen(config.app.port, () => {
	console.log(`Service is listening to ${config.app.port}`);
});
// server.use(logger('dev'));
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: false }));
// server.use(cookieParser());
// server.use(express.static(path.join(__dirname, 'public')));

// server.use('/profile', profile);

// server.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// server.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = server;