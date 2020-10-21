var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const express = require('express')
var configuracion = require('dotenv').config();


//rutas

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productoRouter = require('./routes/productDetail');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);

// Listen

app.listen(3000, () => { console.log('Server corriendo'); });

// Index

app.use('/', indexRouter);

// Carrito de compras

app.get('/carrito', function (req, res) {
  let file = path.resolve('pages/productCart.html');
  res.sendFile(file);
});

// Detalle de producto

app.use('/producto', productoRouter);

// Login

app.get('/login', function (req, res) {
  let file = path.resolve('pages/login.html');
  res.sendFile(file);
});


// Registro

app.get('/register', function (req, res) {
  let file = path.resolve('pages/register.html');
  res.sendFile(file);
});

 
// Login 2 >>> BORRAR!

app.get('/login2', function (req, res) {
  let file = path.resolve('pages/login-2.html');
  res.sendFile(file);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;