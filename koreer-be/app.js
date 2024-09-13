// Handles request errors
// Link to GET / POST routes
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
// Module Aliasing
require('module-alias/register');
var authMiddleware = require('./src/middlewares/authMiddleware');

// Generate JWT Secret key
require('./src/auth/generateSecret');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var jobInfoRouter = require('./routes/jobinfos');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

// CORS 설정을 라우터들 전에 배치
app.use(cors({
  origin: '', // 모든 출처 허용
}));
app.options('', cors());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

// 그 외 모든 요청에 대해 authMiddleware 적용
app.use(authMiddleware);

// CORS 설정을 라우터들 전에 배치
app.use(cors({
  origin: '', // 모든 출처 허용
}));
app.options('', cors());

app.use('/jobinfos', jobInfoRouter);

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
  console.log(err.message);
});

module.exports = app;
