var createError = require('http-errors');
var express = require('express');
const app = express()
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



// Index

app.get('/', function (req, res) {
  let file = path.resolve('pages/index.html');
  res.sendFile(file);
});

// Carrito de compras

app.get('/carrito', function (req, res) {
  let file = path.resolve('pages/productCart.html');
  res.sendFile(file);
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Listen

app.listen(3000, () => { console.log('Server corriendo'); });

module.exports = app;
