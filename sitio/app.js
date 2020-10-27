// ********** Requires **********
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express')
const configuracion = require('dotenv').config();
const methodOverride = require('method-override');

// ********** Express **********
const app = express();

// ********** Middlewares **********
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// ********** Template Engine **********
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// ********** Rutas y app.use **********
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

app.use('/', indexRouter);
app.use('/usarios', usersRouter);
app.use('/productos', productsRouter);

// ********** NO TOCAR A PARTIR DE ACÁ **********
// ********** Para errores 404 **********
app.use((req, res, next) => next(createError(404)));

// ********** Manejo de errores **********
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ********** Exports app **********
module.exports = app;